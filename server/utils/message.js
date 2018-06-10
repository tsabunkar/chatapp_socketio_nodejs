var date = new Date();

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    }
}

module.exports = {
    generateMessage
}