//this is the root index for all the api routes
const express=require('express');
const router=express.Router();

router.use('/v1',require('./v1'));


module.exports=router;