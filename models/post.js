const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true //required tell us that without it data won't be saved
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,      //this type is a refference and it needs to reffer to a user's schema
        ref:'User'   //we are reffering ot user schema
    },
    //include the array of ids of all comments in this post schema itself
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Comment'
        }
   ]

},{
    timestamps:true
});


//we need to that this is the model in the database
const Post=mongoose.model('Post',postSchema); //first argument is Model Name and second one is the schema this model is following
module.exports=Post;