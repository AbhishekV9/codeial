//calling it as users controller because this controller will handle multiple users

const User=require("../models/user");//requiring models



module.exports.profile=function(req,res){
  //  res.end('<h1>User"s Profile</h1>'); sending it directly to the browser

  return res.render('profile',{
    title:'User Profile'
  });
};

module.exports.post=function(req,res){
    res.end("<h1>User's post</h1>")
};

//render the sign up page
module.exports.signUp=function(req,res){
  return res.render('user_sign_up',{
    title:'Codieal | Sign Up'
  });
};

//render the sign in page
module.exports.signIn=function(req,res){
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
  //TODO LATER
}