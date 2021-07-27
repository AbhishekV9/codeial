const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
//one we are importing the strategy second we are importing a module wich will help us in extracting jwt from
//the header
const ExtractJWT=require('passport-jwt').ExtractJwt;

//we require user for authentication
const User=require('../models/user');

//while defining jwt strategy we need to have some options 1.encryption 2.decryption

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    //header has a list of keys
    secretOrKey:'Codeial'
}


//this function reads the data from the payload
//all the user's info are present in payload
passport.use(new JWTStrategy(opts,function(JwtPayLoad,done){
//done is again a call back function 
    User.findById(JwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
            //false means the user was not found
        }
    });

}));

module.exports=passport;