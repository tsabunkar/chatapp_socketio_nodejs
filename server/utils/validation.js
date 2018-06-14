var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}
//validating the string is proper string format

module.exports = {
    isRealString
}