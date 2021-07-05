const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true //required tell us that without it data won't be saved
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,      //this type is a refference and it needs to reffer to a user's schema
        ref:'user'   //we are reffering ot user schema
    }
},{
    timestamps:true
});


//we need to that this is the model in the database
const Post=mongoose.model('Post',postSchema); //first argument is Model Name and second one is the schema this model is following
module.exports=Post;