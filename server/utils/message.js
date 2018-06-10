var date = new Date();

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    }
}

var generateLocationMessage = (from , latitude, longitiude ) => {
    return{
        from ,
        geoLocUrl : `https://www.google.com/maps?q=${latitude},${longitiude}`,
        createdAt: (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}