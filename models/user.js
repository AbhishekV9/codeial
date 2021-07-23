const mongoose=require('mongoose');
const multer=require('multer');
//we require path to set up where the file has stored
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true //whenever the user will signup it will require the user name
    }

},{
    timestamps:true //timestamps is creted at and updated at....so db will store when the user has signed up and whenever the user
    //updates its name etc...iw will be also stored in db
});

const User=mongoose.model('User',userSchema); //telling mongoose that this is the model

module.exports=User;