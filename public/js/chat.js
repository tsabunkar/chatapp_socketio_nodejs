var socketClient = io(); //we are making the request from client to server -> to open-up a websocket connection, and always keep it open

//This is to listen to an event , which would be sent from server to client this is connect event , which connects to the server
socketClient.on('connect', () => { //arrow function is not supported in IE
    console.log('connected to server');

    //when event is connected , we are differentiating different user based on room joined
    var urlParms = window.location.search; //fetching the url param in the form string 
    var urlParmsConvertedToObject = $.deparam(urlParms); //will decode the url string format to required JS Object

    //creating the join event
    socketClient.emit('join', urlParmsConvertedToObject, (err) => {
        //acknowledgemnet
        if (err) { //This if statment is executed only if the callback function throws a string method
            //if error has occured -> means invalid string eneterd in personId and roomId
            //then redirected to home page i.e-index.html for that using -> window.location.href
            alert(err);
            window.location.href = "/";
        } else {
            console.log('No error');
        }
    })

}); //end of connect listener

//this diconnect event will be fired, when the connection will be dropped/closed
socketClient.on('disconnect', () => {
    console.log('disconnected from server');
});

//updateUsersList event listener
socketClient.on('updateUsersList', (usersList) => {
    // console.log('users list', usersList);

    var olElem = $('<ol></ol>');
    usersList.forEach((userObj) => {
        olElem.append($('<li></li>').text(userObj))
    });

    $('#usersList').html(olElem);
})


socketClient.on('newMessage', (dataSendFromServer) => {

    /*  var formattedTime = moment(dataSendFromServer.createdAt).format('h:mm a');
     console.log('Got new Message', dataSendFromServer);
     var liElement = $('<li></li>');
     liElement.text(`${dataSendFromServer.from} ${formattedTime} : ${dataSendFromServer.text}`);
     $("#messageOrderListId").append(liElement); */

    //using mustache.js for rendering the template, instead of using Jquery

    var formattedTime = moment(dataSendFromServer.createdAt).format('h:mm a');
    var myTemplate = $('#messageTemplateId').html();
    var htmlElem = Mustache.render(myTemplate, {
        textValueInject: dataSendFromServer.text,
        fromValueInject: dataSendFromServer.from,
        createdAtValueInject: formattedTime
    }); // Mustache.render() -> render the template

    $('#messageOrderListId').append(htmlElem);

})

socketClient.on('newLocationMessage', (messageVal) => {
    /*  var formattedTime = moment(messageVal.createdAt).format('h:mm a');

     var liElem = $('<li></li>');
     var anchorEle = $('<a target="_blank">My current location</a>');
     liElem.text(`${messageVal.from} ${formattedTime} : `);
     anchorEle.attr('href', messageVal.geoLocUrl)
     liElem.append(anchorEle);
     $("#messageOrderListId").append(liElem); */

    //using mustache.js for rendering the template, instead of using Jquery

    var formattedTime = moment(messageVal.createdAt).format('h:mm a');
    var myTemplate = $('#locationMessageTemplateId').html();
    var htmlElem = Mustache.render(myTemplate, {
        urlValueInject: messageVal.geoLocUrl,
        fromValueInject: messageVal.from,
        createdAtValueInject: formattedTime
    }); // Mustache.render() -> render the template

    $('#messageOrderListId').append(htmlElem);
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