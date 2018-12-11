var express = require("express");
//To load .env
require("dotenv").config();
//To load BodyParser
var bodyParser = require("body-parser");
var app = express();
//Load MongoDB
var mongoose = require("mongoose");

//Logger
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
//Console
console.log("Hello World");
//Start a working express server
app.get("/hello", (req, res) => {
    res.send("Hello Express!");
});
//Serve an HTML
app.get("/",(req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});
//Serve static assets
app.use(express.static(__dirname + "/src"));
//Serve a JSON 
app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE == "uppercase") {
        res.json({
            "message": "HELLO JSON!"
        });
    } else {
        res.json({
            "message": "Hello JSON!"
        });
    } 
});
//Chained middleware to create a time server
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ 
        "time": req.time
    });
});
//Get route parameter input from client
app.get("/:word/echo", (req, res) => {
    var word = req.params.word;
    res.json({
        "echo": word
    });
});
//Get query parameter input from client
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({
        "name": firstName + " " + lastName 
    });
});
//Get data from POST requests
app.post("/name", (req, res) => {
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({
        "name": firstName + " " + lastName
    });
});
//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
//Creating a Schema
var Schema = mongoose.Schema;
var personSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 0 },
    favoriteFoods: [{ type: String }]
});
//Creating a Model
var Person = mongoose.model("Person", personSchema);
//Create and Save the record/records of a model
var person = new Person({ name: "Ben", age: 23, favoriteFoods: ["tuna", "bread"] });
person.save((err, result) => {
    if (err) {
        return err;
    } else {
        console.log(result);
    }
});
Person.create([{
    name: "Joe",
    age: 24,
    favoriteFoods: ["Apple", "Banana"]
}, {
    name: "Sam",
    age: 22,
    favoriteFoods: ["Peach", "Rock"]
}], function(err, result) {
    if(err) {
        return err;
    } else {
        console.log(result);
    }
});
//To listen on port 3000
app.listen(3000);

module.exports = app;