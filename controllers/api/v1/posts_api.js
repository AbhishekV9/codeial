//index is usually used when you want to list down something as an action name
module.exports.index=function(req,res){
    return res.json(200,{
        message:'List of Posts',
        posts:[]
    });
}