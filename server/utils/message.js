// var date = new Date();
const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        // createdAt: (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
        createdAt: moment.valueOf()
    }
}

var generateLocationMessage = (from , latitude, longitiude ) => {
    return{
        from ,
        geoLocUrl : `https://www.google.com/maps?q=${latitude},${longitiude}`,
        // createdAt: (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
        createdAt: moment.valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}