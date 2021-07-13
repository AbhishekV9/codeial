const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');


//authentication using passport
//we need to tell passport to use the local strategy that we have created
passport.use(new LocalStrategy({
    //define syntax
    usernameField: 'email',  //email is defined on schema
    passReqToCallback:true //this basically allows us to set first argument of callback fn as req so that we can use flash messsage through req
    },
    function(req,email,password,done){     //callback function inside localstrategy
    
        //done is another function which is inbuilt to passport...it reports back to passport and isntead of word done
        //we can use any other word for callbackfunction to the passport
       
        //whenever this local strategy is called the email and the password wiil be passed on plus a done function
        // will be passed on, which will be called based on whatever things are happening in passport whether the request is 
        //sucessfull or unsucessfull this all will be handeled by this done function


        //find a user and establish the identity
        User.findOne({email :email},function(err,user){
            //first email is the value we are looking for in db
            //second email is tha value that is passed
            if(err){
               // console.log('Error in finding user--> Passport');
               req.flash('error',err);
                return done(err);//this will report an error to passport
                //done takes the two argument first error and second is something else here we will go with one argment err only
            }

            if(!user || user.password!=password){//if user is not found or password entered is incorrect then
               //console.log('invalid username/password');
               req.flash('error','Invalid Username/Password');
                return done(null,false);
                //if there is error send null and authentication is not done so pass false as second argument
            }

            //if user is found and password entered is correct then
            return done(null,user);//this returns to the serializer below


        });
    }

    
));

//we need two more things 1.A serialize user function. 2. A deserialize user function :- see on notes


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);//we just want to store users id in encrypted format into the cookie.the cookie is then sent back to
    //the browser
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user--> Passport');
            return done(err);
        }

        return done(null,user);
    });
});


//sending data of signed in current user to the views

//1st step:-Check if the user is authenticated
passport.checkAuthentication=function(req,res,next){ //i will be using this function as middleware
    //pasport puts a method on request as isAuthenticated,by using this we are going tocheck that user is authenticated or not
   
    //if the user is signed in,then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');



}

//set the user for the views

//i am jsut creating this function in passport

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user //whenever a user is signed in that users information is availaible in req.user
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views

        // The res. locals property is an object that contains response local variables scoped to the request 
        // and because of this, it is only available to the view(s) rendered during that request/response cycle (if any).
    }
    next();
}

module.exports=passport;