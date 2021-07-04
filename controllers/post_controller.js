const post=require('../models/post');

module.exports.create=function(req,res){
    post.create({
        content:req.body.content,
        user:req.user._id // in main index.js we have---- app.use(passport.setAuthenticatedUser); wich guide us to passport local strategy 
        //in config and there we have --- res.locals.user=req.user. this set the authenticated user so we can get id by
        //using this line
    },function(err,post){
        if(err){
            console.log('Error in Creating Post');
            return;
        }
        return res.redirect('back');
    });
}