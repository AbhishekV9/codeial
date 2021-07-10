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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
            // i will find it by post id so thats the first argument and secondly i need to pull out comment id from
            // the list of comments in post so second argument is inbuilt function through wich i will pull it out

            //in 2nd argument i have to pull and from where so that's comments,and what do we need to pull so that's
            // the comment id
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}