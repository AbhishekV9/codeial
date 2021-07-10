const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentsController=require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentsController.create); //2nd level check u 
//can create post only if you are authenticated and 1st level check is in home .ejs  
//showing form only to the user who is authenticated

module.exports=router;