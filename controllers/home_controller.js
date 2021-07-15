const Post = require('../models/post');
const User = require('../models/user');

//code after async await lecture:-

module.exports.home=async function(req,res){  
    try{
        let posts=await Post.find({}) //by writing await we are telling to wait before moving to next one means first exectute it then goto next part.
        .sort('-createdAt')
        .populate('user')           
        .populate({
            path:'comments',   
            populate:{         
                path:'user'     
            }
        });
   
       let users=await User.find({});
       
       return res.render('home',{             //once both awited function are executed then we will return something    
               title:'Codiel | Home',         //to the browser
               posts:posts,              
               all_users:users
           });

    }catch(err){
        console.log('Error',err);
        return;
    }

}