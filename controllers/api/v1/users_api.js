const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    //what do we need to do whenever a username and password is recieved
    //we need to find that user and generate that jwt corrosponds to that user
    try {
        let user=await User.findOne({ email:req.body.email});

        if(!user || user.password !=req.body.password){
            return res.json(422,{
                message:'Invalid username or password'
            });
        }

        return res.json(200,{
            message:'sign in successfull, here is your token please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(),'Codeial',{ expiresIn: '1000000'})
                //here when we are generating the token we are using codial as the key
            }
        })
    } catch (err) {
        console.log(err);
        return res.json(500,{
            message:'Internal server error'
        })
    }

  }
  