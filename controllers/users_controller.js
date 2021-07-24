//calling it as users controller because this controller will handle multiple users

const User=require("../models/user");//requiring models



module.exports.profile=function(req,res){
  //  res.end('<h1>User"s Profile</h1>'); sending it directly to the browser

  User.findById(req.params.id,function(err,user){
    return res.render('profile',{
      title:'User Profile',
      profile_user:user
    });

  })
  // return res.render('profile',{
  //   title:'User Profile'
  // });
};

module.exports.update= async function(req,res){
  // if(req.user.id==req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //      //first parameter is the id wich i want to update and the second parameter is the content i want to change
  //      //i can write second arg as {name:req.body.name,email:req.body.email} also.

  //     return res.redirect('back');
  //   });
   
  // }else{
  //   return res.status(401).send('unauthorized');
  // }

//converting upper code into async await because we are adding avatar feature now
      if(req.user.id==req.params.id){
        try{
          let user= await User.findByIdAndUpdate(req.params.id);
          //once i get the user i need to update but when i want to access the body params in the form, i won't be able to 
          //access it directly from req.params because it is a multipart form so my boy parser is not able to parse it.
          //the staic function uploadedAvatar in models/users.js will help us to do this 
          User.uploadedAvatar(req,res,function(err){
             if(err){
               console.log('multer error',err);
             }
            // console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
              //this is saving the path of the uploaded file into the avatar feild in the user
              user.avatar=User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            res.redirect('back');
          });
        }catch(err){
          req.flash('error',err);
          return res.redirect('back');
        }

        }else{
          req.flash('error','unauthorized');
          return res.status(401).send('unauthorized');
        }

}

module.exports.post=function(req,res){
    res.end("<h1>User's post</h1>")
};

//render the sign up page
module.exports.signUp=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile'); //if user is signed in then he can not go to sign up page
  }



  return res.render('user_sign_up',{
    title:'Codieal | Sign Up'
  });
};

//render the sign in page
module.exports.signIn=function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile'); //if user is signed in then he can not go to sign in page
  }



  return res.render('user_sign_in',{
    title:'Codieal | Sign In'
  });
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
     }

     User.findOne({email:req.body.email},function(err,user){ //finding email that it exist already or not
        if(err){
          console.log("error in finding user in signing up");
          return;
        }

        if(!user){ //if user dosent exist then
            User.create(req.body,function(err,user){
                if(err){
                  console.log("error in creating user while signing up");
                  return;
                }
                return res.redirect('/users/sign-in');
          });
        }else{  //if user already exist
          return res.redirect('back');
        }

     });
}

//sign in and create the session for the user
module.exports.createSession=function(req,res){
  req.flash('success','Logged in Sucessfully');
  //when passport.js uses a function i.e local strategy to authenticate the user,the control comes over here and this redirects to 
  //the homepage
  return res.redirect('/');
  //session is created in passport.js itself
}

module.exports.destroySession=function(req,res){
  req.logout();//this function is given to request using passport.js

  req.flash('success','You have Logged Out!');//this is on the request what we are sending back is the response so
  //this messgae needs to transfer to the response,one thing we can do is pass them into the locals every time
  //like res.redirect('/',{flash:{sucess,"some message"}}); but we will not do this we will create our own middleware
  return res.redirect('/');
}