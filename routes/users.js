//it handles routes of users

const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
router.get('/Profile',userController.profile);
router.get('/Post',userController.post);


module.exports=router;