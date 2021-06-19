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