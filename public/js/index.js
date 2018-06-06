var socketClient = io(); //we are making the request from client to server -> to open-up a websocket connection, and always keep it open

//This is to listen to an event , which would be sent from server to client
//this is connect event , which connects to the server
socketClient.on('connect', () => { //arrow function is not supported in IE
    console.log('connected to server');

    //creating a custom event and emitting it from client to server
    socketClient.emit('createEmail', {
        to:'usha@gmail.com',
        text : 'Hey this is usha sabunkar'
    });

    socketClient.emit('createMessage',{
        from:'Shailesh',
        text : 'Hey this is Shailesh sabunkar'
    })

});//end of connect listener

//this diconnect event will be fired, when the connection will be dropped/closed
socketClient.on('disconnect', () => {
    console.log('disconnected from server');
})

//this is the listener, for newEmail (which is our custome event)
socketClient.on('newEmail', (dataSendFromServer) => {
    console.log('new email',dataSendFromServer);
})

//chat application
socketClient.on('newMessage', (dataSendFromServer) => {
    console.log('Got new Message',dataSendFromServer);
})

