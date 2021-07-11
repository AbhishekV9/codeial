//it handles routes of users

const express=require('express');
//const { route } = require('.');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');

router.get('/Profile/:id',passport.checkAuthentication,userController.profile);
//if authentication is checked then only the profile page will be accessible
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/Post',userController.post);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(//middleware
    'local', //the strategy used is local
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);


module.exports=router;