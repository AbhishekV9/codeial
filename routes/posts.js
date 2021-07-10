const express=require('express');
const router=express.Router();
const passport=require('passport');

const postController=require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create); //2nd level check u 
//can create post only if you are authenticated and 1st level check is in home .ejs  
//showing form only to the user who is authenticated

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports=router;