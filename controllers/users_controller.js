//calling it as users controller because this controller will handle multiple users

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
  //TODO LATER
}

//sign in and create the session for the user
module.exports.createSession=function(req,res){
  //TODO LATER
}