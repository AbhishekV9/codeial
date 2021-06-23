//module.exports.actionName=function(req,res){

//}

module.exports.home=function(req,res){   //we are exporting this home function
    // res.end('<h1>Express is up for codial</h1>'); here we are sending directly something to the browser

//  console.log(req.cookies); accessing the cookies

//  res.cookie('user_id',25); changing the value of cookies from server side

    return res.render('home',{
        title:'Home'                          //sending a html file to browser
    });
}