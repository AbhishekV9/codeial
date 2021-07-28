const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsApi=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{ session:false }),postsApi.destroy);
//kepping session as false because i do not want session cookie to be generated
module.exports=router;