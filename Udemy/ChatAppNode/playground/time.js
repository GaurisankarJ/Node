const moment = require("moment");

// const date = new Date();
// console.log(date.getMonth());

const date = moment();
date.add(1, "y");
console.log(date.format("MMM Do, YYYY, h:mm a"));

const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
