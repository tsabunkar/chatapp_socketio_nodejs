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

    var formattedTime = moment(dataSendFromServer.createdAt).format('h:mm a');
    console.log('Got new Message', dataSendFromServer);
    var liElement = $('<li></li>');
    liElement.text(`${dataSendFromServer.from} ${formattedTime} : ${dataSendFromServer.text}`);
    $("#messageOrderListId").append(liElement);
})

socketClient.on('newLocationMessage', (messageVal) => {
    var formattedTime = moment(messageVal.createdAt).format('h:mm a');

    var liElem = $('<li></li>');
    var anchorEle = $('<a target="_blank">My current location</a>');
    liElem.text(`${messageVal.from} ${formattedTime} : `);
    anchorEle.attr('href', messageVal.geoLocUrl)
    liElem.append(anchorEle);
    $("#messageOrderListId").append(liElem);
})

//-------------------JQuery code----------------------

//jquery, here we r overridding the default behaviour of page load when <form> is
//submitted, by using preventDefault() method
$('#formId').on('submit', (e) => { //onsubmit of form this function will be invoked
    e.preventDefault();

    socketClient.emit('createMessage', {
        from: 'User',
        text: $('#messageId').val()
    }, () => { //3rd argum of emit(), which is for acknowledgement

        $('#messageId').val('') //clearing the text value to empty when message is send
       
    })
})

var locationBtn = $('#sendLocationId');
locationBtn.on('click', () => {
    if (!navigator.geolocation) {
        //if geolocation is not supported by the browser
        return alert('Geolocation is not supported by ur browser!!');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending Location..')

    navigator.geolocation.getCurrentPosition((positionVal) => {

        locationBtn.removeAttr('disabled').text('Send Location')

        //1st argu -> when successfully able to fetch the current location
        // console.log(positionVal);
        socketClient.emit('createLocationMessage', {
            latitude: positionVal.coords.latitude,
            longitude: positionVal.coords.longitude
        })
    }, () => {
        //2nd argum -> failure/error scenarion
        alert('unable to fetch the location, please give the permission')
        locationBtn.removeAttr('disabled').text('Send Location')
    })
});