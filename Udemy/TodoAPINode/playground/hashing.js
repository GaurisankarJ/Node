const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//CryptoJS
var message = "Hi. I am Sankar.";
var hash = SHA256(message).toString();//SHA256 returns an object

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + "SALT").toString()
};
var resultHash = SHA256(JSON.stringify(token.data) + "SALT").toString();
if(token.hash === resultHash) {
    console.log("Data was not changed.")
} else {
    console.log("Data was changed. Do not trust!");
}

//JSONWebTokens
var newToken = jwt.sign(data, "SALT");
var decoded = JSON.stringify(jwt.verify(newToken, "SALT"));

console.log(`Token: ${newToken}`);
console.log(`Decoded: ${decoded}`);

//BCryptJS
var password = "abc123!";

bcrypt.genSalt(10, (err, salt) => {
    //10 number of rounds
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = "$2a$10$4Tr9fLDRO375CDWSP9anL.YR1lmKxdJ1dA1.jfCHBF2i5mWB4.7hC";

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});