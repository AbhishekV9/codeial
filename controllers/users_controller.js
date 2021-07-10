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
  //when passport.js uses a function i.e local strategy to authenticate the user,the control comes over here and this redirects to 
  //the homepage
  res.redirect('/');
  //session is created in passport.js itself
}

module.exports.destroySession=function(req,res){
  req.logout();//this function is given to request using passport.js

  res.redirect('/');
}