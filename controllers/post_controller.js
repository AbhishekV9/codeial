const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    try{
       let post= await Post.create({
            content:req.body.content,
            user:req.user._id // in main index.js we have---- app.use(passport.setAuthenticatedUser); wich guide us to passport local strategy 
            //in config and there we have --- res.locals.user=req.user. this set the authenticated user so we can get id by
            //using this line
        });
        
        //we need to check if the request is an ajax request,now the type of ajax requet is xml http request(xhr) then i need to return some json
        if(req.xhr){
            //we return json with status
           
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created!'
            });
        }
        req.flash('success','Post Published');
        return res.redirect('back');
       
    }catch(err){
        //console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
 
};


//after async await lecture
module.exports.destroy=async function(req,res){
    try{
        let post= await Post.findById(req.params.id)

        if(post.user== req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post deleted'
                });
            }
            
            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');  
        }else{
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }  

    }catch(err){
        //console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
}
