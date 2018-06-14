const path = require('path');
const express = require('express');
const socketIO = require('socket.io')
const http = require('http'); //built in node module
const _ = require('lodash')
//instead we could have use Object destructring technique here i.e-
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message')
const {
    isRealString
} = require('./utils/validation')

const port = process.env.PORT || 3000;

// console.log(__dirname+'/../public');

const publicPath = path.join(__dirname + '/../public')



var app = express(); //It is use to configure the expressjs application note : we dont configure the expressjs by calling the express, rather we configure expressjs appln by caling this variable -> app 
var server = http.createServer(app);
//when we call app.listen() method , this internally call this  http.createServer() method
var socketServer = socketIO(server); //configure server to use 3party module -> socketIO

app.use(express.static(publicPath)); //to setup the public folder which have all the frontend static pages


//this method let's u register an event listener at server side, soo that @server side we can do some logic/implem when that event happens @client side this 'connection' ->(built-in event) lets us to listen to new connection, (ie when a new client is connected to our server this event will be triggered) and inside the callback fun we write our implemen logic when new client is connected
socketServer.on('connection', (socketClient) => {
    //we write our implemen logic when new client is connected this -> socketClient , is similiar to socket present inside the client side
    console.log('New user is connected!!, Connected to client');

    //emit -> we use emit() inorder to emit/send the event @client and @server side emit() -> this is not a listener , its an emit since it is not listener , soo need to specifiy the callback as second argument in second arugum we specifiy the data which we want to send, bydefault it can be empty if we dont want to send the data



    //listener for join event
    socketClient.on('join', (urlParms, callback) => {
        //checking if the entered personId and roomId input txt box value is in proper
        //string format using this if statement
        console.log(urlParms);
        console.log(urlParms.personId, urlParms.roomId);
        if (!isRealString(urlParms.personId) || !isRealString(urlParms.roomId)) {
            callback('Name and room-name required'); //sending the error message
            return
        }


        //if valid personId and roomId then doesnt send any error message

        socketClient.join(urlParms.roomId) //this will the join a particular user to the particular roomId/roomName
        //join() -> this is inbuilt method provided by socket.io
        //similarly we have socketClient.leave(); //use to leave a specific room soo that user wont get messages from
        // that particular room



        //It is to great/welcome all the clients ,who r joining our application 
        socketClient.emit('newMessage',
            /*   message.generateMessage('Admin', 'welcome to chat app') */
            generateMessage('Admin', 'welcome to chat app')
        );



        //It is to say other clients who has already join the chat appln that, a new user has joined
        // socketClient.broadcast.emit('newMessage', //instead of broadcasting to every user who has joind the chat appln
        socketClient.broadcast.to(urlParms.roomId).emit('newMessage', //we will bordcast only to specific user, who belongs that particular room
            generateMessage('Admin', `${urlParms.personId} has joined`)//showing the name who has joined to the prvoius members already present in that chat-room
        );

        callback();
    })//end of join listener


    socketClient.on('createMessage', (dataSendFromClient, callback) => {
        console.log('new email', dataSendFromClient);

        //If the particular client broadcast an event, then this event is recieved to all the other
        //clients, including the client who has send it

        socketServer.emit('newMessage',
            generateMessage(dataSendFromClient.from, dataSendFromClient.text)
        );

        // callback('this message is from server'); //this callback fun will call 3rd argument of socketClient.emit('createMessage', {}, ()=> );
        callback();
        //which is written in the client code
    });


    //createLocationMessage is an event emitter from client to server
    socketClient.on('createLocationMessage', (coordinatesVal) => {
        // socketServer.emit('newMessage', generateMessage('Admin', `lat :${coordinatesVal.latitude} & long:${coordinatesVal.longitude}`) )
        //newLocationMessage is an event emitter from server to client
        socketServer.emit('newLocationMessage',
            generateLocationMessage('Admin', coordinatesVal.latitude, coordinatesVal.longitude));
    })

    //on() -> this method is listener
    socketClient.on('disconnect', () => {
        console.log('client has beed disconnected !');
    })

}) //end of connection event listener


server.listen(port, () => {
    console.log(`server started @${port} port`);
})