//first file to be created 

const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');//we got our library now we need to tell our app to use it...before we have
//required our routes
app.use(expressLayouts);

//putting styles and scripts from sub pages to layout...css tag in layouts head part and script tag just above body end in layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.use(express.static('./assets'));

//use express router:-we are telling here that any request comes in is handeled by this route
app.use('/',require('./routes/index'));//i can write just './routes' also because it by default fetches index


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
        console.log(`Error in running the server:${err}`)//this is interpolation:- to include a variable in string without ' + ' or ' , '. after $ it knows that the thing inside {} is to be evaluated
    }

    console.log(`Server is runnig on Port: ${port}`);
});
