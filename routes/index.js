const express=require('express');
const router=express.Router();
console.log('router loaded')

const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);//accessisng home function from home_controller.js

module.exports=router;//i need to export this to be available to index.js where i will use it and in index.js we need to tell app to use it remeber 
//we use to use app.get, app.post so we need to tell app that all the get post and everything will be handeled by this module