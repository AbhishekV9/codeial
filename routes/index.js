const express=require('express');
const router=express.Router();
console.log('router loaded')

const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);//accessisng home function from home_controller.js

router.use('/users',require('./users'));//whenever the request is for users,whenever the path or pattern of the route is users
// you can just require my neighbour wich is users.any thing other than /users will be forwarded to home controller

router.use('/posts',require('./posts'));

module.exports=router;//i need to export this to be available to index.js where i will use it and in index.js we need
 //to tell app to use it remeber we use to use app.get, app.post so we need to tell app that all the get post and 
 //everything will be handeled by this module