const path = require('path');

// console.log(__dirname+'/../public');

const publicPath = path.join(__dirname+'/../public')
// console.log(publicPath);


const express = require('express');
const port = process.env.port || 3000;

var app = express();//It is use to configure the expressjs application
//note : we dont configure the expressjs by calling the express, rather we configure expressjs appln by
//caling this variable -> app 

app.use(express.static(publicPath));//to setup the public folder which have all the frontend static pages

app.get('/',(request,response)=> {
    response.render('index.html', {})
})//end of get() method

app.listen(port , ()=> {
    console.log(`server started @${port} port`);
})