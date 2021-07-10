const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
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
};

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
      // .id means converting the object id into string and its better during comparision thats why we have used
      // .id instead of ._id
      if(post.user== req.user.id){
          post.remove();

          Comment.deleteMany({post:req.params.id},function(err){
                  return res.redirect('back');     
          })
      }else{
        return res.redirect('back');
      }  
    })
}