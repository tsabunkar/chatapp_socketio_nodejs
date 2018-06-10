const path = require('path');
const express = require('express');
const socketIO = require('socket.io')
const http = require('http');//built in node module
const _ = require('lodash')


const port = process.env.PORT || 3000;

// console.log(__dirname+'/../public');

const publicPath = path.join(__dirname + '/../public')
// console.log(publicPath);




var app = express();//It is use to configure the expressjs application
//note : we dont configure the expressjs by calling the express, rather we configure expressjs appln by
//caling this variable -> app 
var server = http.createServer(app);
//when we call app.listen() method , this internally call this  http.createServer() method
var socketServer = socketIO(server);//configure server to use 3party module -> socketIO

app.use(express.static(publicPath));//to setup the public folder which have all the frontend static pages


//this method let's u register an event listener at server side, soo that @server side we can do some logic/implem
//when that event happens @client side
//this 'connection' ->(built-in event) lets us to listen to new connection, (ie when a new client is connected
//to our server this event will be triggered) and inside the callback fun we write our implemen logic when
//new client is connected
socketServer.on('connection', (socketClient) => {
    //we write our implemen logic when new client is connected
    //this -> socketClient , is similiar to socket present inside the client side
    console.log('New user is connected!!, Connected to client');

    //emit -> we use emit() inorder to emit/send the event @client and @server side
    //emit() -> this is not a listener , its an emit
    //since it is not listener , soo need to specifiy the callback as second argument
    //in second arugum we specifiy the data which we want to send, bydefault it can be empty if we dont want to
    //send the data
    
    /* socketClient.emit('newEmail', {
        from : "tsabunkar@gmail.com",
        text :'Hey what is going on',
        createdAt : 123
    }) */
    
    //This is the listener which listens to the createEmail -> custome event create
    /* socketClient.on('createEmail', (dataSendFromClient) =>{
        console.log('new email', dataSendFromClient);
    }); */

    
    //chat application
    /*  var date = new Date();
    socketClient.emit('newMessage', {
        from : "Tejas",
        text :'Welcome 2 expressMedia',
        createdAt : (date.getDate())+'/'+(date.getMonth()+1)+'/'+(date.getFullYear())
    }) */

    socketClient.on('createMessage', (dataSendFromClient) =>{
        console.log('new email', dataSendFromClient);
        socketServer.emit('newMessage',{
            from : dataSendFromClient.from,
            text : dataSendFromClient.text,
            createdAt : dataSendFromClient.createdAt
        })
    });
    

    //on() -> this method is listener
    socketClient.on('disconnect', () => {
        console.log('client has beed disconnected !');
    })
})




/* 
app.get('/',(request,response)=> {
    response.render('index.html', {})
})//end of get() method
 */


server.listen(port, () => {
    console.log(`server started @${port} port`);
})
