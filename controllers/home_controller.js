const Post = require('../models/post');
 

//module.exports.actionName=function(req,res){

//}

module.exports.home=function(req,res){   //we are exporting this home function
    // res.end('<h1>Express is up for codial</h1>'); here we are sending directly something to the browser

//  console.log(req.cookies); accessing the cookies

//  res.cookie('user_id',25); changing the value of cookies from server side

    // Post.find({},function(err,posts){


    //     return res.render('home',{                  //sending a html file to browser
    //         title:'Codiel | Home',        
    //         posts:posts                  

    //     });

    // });


    //we are finding all the posts and populating user of each post. we need to write callback function inside exec function.
    Post.find({}).populate('user').exec(function(err,posts){

        return res.render('home',{                 
            title:'Codiel | Home',        
            posts:posts                  

        });

    });

  
}