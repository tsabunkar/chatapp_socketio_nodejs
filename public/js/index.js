var socketClient = io(); //we are making the request from client to server -> to open-up a websocket connection, and always keep it open

//This is to listen to an event , which would be sent from server to client this is connect event , which connects to the server
socketClient.on('connect', () => { //arrow function is not supported in IE
    console.log('connected to server');

}); //end of connect listener

//this diconnect event will be fired, when the connection will be dropped/closed
socketClient.on('disconnect', () => {
    console.log('disconnected from server');
})


socketClient.on('newMessage', (dataSendFromServer) => {
    console.log('Got new Message', dataSendFromServer);
    var liElement = $('<li></li>');
    liElement.text(`${dataSendFromServer.from}: ${dataSendFromServer.text}`);
    $("#messageOrderListId").append(liElement);
})


//jquery, here we r overridding the default behaviour of page load when <form> is
//submitted, by using preventDefault() method
$('#formId').on('submit', (e) => {//onsubmit of form this function will be invoked
    e.preventDefault();

    socketClient.emit('createMessage', {
        from: 'User',
        text: $('#messageId').val()
    }, () => {
        //3rd argum of emit(), which is for acknowledgement

    })
})