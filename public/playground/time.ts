//Jan 1st 1970 00:00:10am -> date and time calcuation happens from here

/* var date = new Date();
var months = ['Jan', 'Feb'];
console.log(date.getMonth()); */

//to work with date -> using 3rd party libr called -> moment

var moment = require('moment')

var date = moment();
console.log(date.format('MMM'));//month -> Jan, Sep
console.log(date.format('MMM YYYY'));//Jun 2018
console.log(date.format('MMM Do YYYY'));
console.log(date.format('MMM Do, YYYY'));//Jun 11th, 2018

console.log("---------Manipulate------");
date.add(1,'year');//will add 1 to the exisiting year
console.log(date.format('MMM Do, YYYY'));//Jun 11th, 2019
date.subtract(3,'months');
console.log(date.format('MMM Do, YYYY'));//Mar 11th, 2019


console.log(moment().startOf('day').fromNow());
console.log(moment().endOf('day').fromNow());


//10:35 am , 6:01am
//using unpadded version for -> hours ex- we want 5:02 am  not  05:02 am
//using padded version for -> minutes ex- we want 12:06 am  not 12:6 am

console.log("======================");
var current_time = new moment().format("h:mm a");
console.log(current_time);
