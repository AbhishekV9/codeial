//first file to be created 

const express=require('express');
const cookieParser=require('cookie-parser')//requiring cookie parser for reading and writing into the cookies
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');//we got our library now we need to tell our app to use it...before we have
//required our routes
const db=require('./config/mongoose');
const session=require('express-session'); //used for session cookie
const passport=require('passport');//both lines are used for passport Authentication
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session); //this library requires an argument wich is the express session
// const MongoStore =require('connect-mongo').default; newer version
const sassMiddleware=require('node-sass-middleware');//requiring sass


app.use(sassMiddleware({ //use it just before the server is starting because i need those files to be precompiled before the server starts
  src:'./assets/scss',                   //from where i will pick scss file to convert it into css
  dest:'./assets/css',                   //where do i need to put my css file
  debug:true,                           //if there is some error i want to show it on terminal
  outputStyle:'extended',               // do i want to see it in single line or multiple line? offcorse multiple line
  prefix:'/css',                        // prefix is basically where do i lookout,since we are using this middleware so where my server should look for css file
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//putting styles and scripts from sub pages to layout...css tag in layouts head part and script tag just above body end in layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);







//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//it should be below view..it is used for cookies and session

//mongo store is used to store the session cookie in  the db
app.use(session({
  name:'codeial',
  //TODO change the secret before deployment in production  mode
  secret:'blahsomething',
  saveUninitialized:false,
  resave:false,
  //we need to give age to the cookie for how long it should be valid
  cookie:{
    maxAge:(1000*60*100)//it is in ms
  },
  store: new MongoStore(
      {
        //it intracts with mongoose
        mongooseConnection: db,
        autoRemove:'disabled'
      },
    //in case the connection is not establised then we should have a callback function
    function(err){
      console.log(err || 'connect mongodb setup ok')
    }
  )
  

}));

//this code is for newer version of mongo-connect
// app.use(session({
//   name:'codeial',
//   secret:'something',
//   saveUninitialized:false,
//   resave:false,
//   cookie:{
//       maxAge:(1000*60*100)
//   },
//   store:MongoStore.create(
//       {
//           mongoUrl:'mongodb://localhost/codial_development',
//           collectionName:'sessions',
//           mongooseConncetion: db,
//           autoRemove: 'disabled'
//       },
     
//       function(err){
//           console.log(err || 'connect-mongodb setup ok');
//       }
//   )
// }));

app.use(passport.initialize());
app.use(passport.session()); //passport also helps in maintaining session

app.use(passport.setAuthenticatedUser); //it will check wether a session cookie is present or not

//use express router:-we are telling here that any request comes in is handeled by this route
app.use('/',require('./routes/index'));//i can write just './routes' also because it by default fetches index

app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
        console.log(`Error in running the server:${err}`)//this is interpolation:- to include a variable in string without ' + ' or ' , '. after $ it knows that the thing inside {} is to be evaluated
    }

    console.log(`Server is runnig on Port: ${port}`);
});


//"^3.2.0" older version