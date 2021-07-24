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
    },
    avatar:{
        type:String//the database just stores the path of the file not the complete file
    }

},{
    timestamps:true //timestamps is creted at and updated at....so db will store when the user has signed up and whenever the user
    //updates its name etc...iw will be also stored in db
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb is a callback function
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static methods 
  userSchema.statics.uploadedAvatar=multer({storage : storage}).single('avatar');
//.single tells that only one file will be uploaded for the feildname avatar not multiple files and this uploadAvatar uses above multer storage
userSchema.statics.avatarPath= AVATAR_PATH;
//just making avatar path publically available


const User=mongoose.model('User',userSchema); //telling mongoose that this is the model

module.exports=User;