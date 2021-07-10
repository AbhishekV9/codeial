const Comment=require('../models/comment')
const Post=require('../models/post');


module.exports.create=function(req,res){
    //we need to create the comment over a post, now to create the comment over the post we neeed to find wether that
    //post exists or not so for that we will find the post with post id first
    Post.findById(req.body.post,function(err,post){//the name of this input is post

        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
                
            },function(err,comment){
                //handle error
                if(err){
                    console.log(err);
                  
                }
                //if comments got created without error then we need to add comment to the post
                post.comments.push(comment);//push funtn is provided by mongodb
                post.save();//so in previous line we have updated our post db so we need to save it then so called save
                res.redirect('/');
            });
        }

    }) ;


}