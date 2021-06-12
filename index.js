//first file to be created 

const express=require('express');
const app=express();
const port=8000;


//use express router:-we are telling here that any request comes in is handeled by this route
app.use('/',require('./routes/index'));//i can write just './routes' also because it by default fetches index

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
        console.log(`Error in running the server:${err}`)//this is interpolation:- to include a variable in string without ' + ' or ' , '. after $ it knows that the thing inside {} is to be evaluated
    }

    console.log(`Seriver is runnig on Port: ${port}`);
});
