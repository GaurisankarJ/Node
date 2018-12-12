"use strict";

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

//MongoDB
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
//CRUD(Create, Read, Update and Delete)
//Create and Save a record of a model
var createAndSavePerson = (done) => {
    var person = new Person({ 
        name: "Sam", 
        age: 23, 
        favoriteFoods: ["Rock", "Bread"] 
    });
    person.save((err, data) => (err)? done(err): done(null, data));
};
createAndSavePerson(console.log);
//Create and Save multiple records of a model
var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => (err)? done(err): done(null, data));
};
let people = [{
    name: "Joe",
    age: 24,
    favoriteFoods: ["Apple", "Banana"]
  },
  {
    name: "Sam",
    age: 22,
    favoriteFoods: ["Peach", "Rock"]
}];
createManyPeople(people, console.log);
//Search your database
var findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => (err)? done(err): done(null, data));
};
findPeopleByName("Sam", console.log);
//Return a single matching record from your database
var findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => (err)? done(err): done(null, data));
};
findOneByFood("Rock", console.log);
//Search database by _id
var findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => (err)? done(err): done(null, data));
};
findPersonById("5c114cf35d75670c5c0c41a8", console.log);
//Perform Classic Updates by running Find, Edit, then Save(without using Model.update())
var findEditThenSave = (personId, done) => {
    let foodToAdd = "Hamburger";
    Person.findById(personId, (err, data) => {
        if(err) {
            done(err);
        } else {
            data.favoriteFoods.push(foodToAdd);
            data.save((err, data) => (err)? done(err): done(null, data))
        }
    });
};
findEditThenSave("5c114cf35d75670c5c0c41a8", console.log);
//Perform Updates on a single record
var findAndUpdateOne = (personName, done) => {
    let ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => (err)? done(err): done(null, data));//findByIdAndUpdate() can be used when searching by Id
    //By default the method passes the unmodified object to its callback, you need to pass { new: true } as the 3rd argument to get the updated object
};
findAndUpdateOne("Joe", console.log);
//Delete one record
var removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => (err)? done(err): done(null, data));//findOneAndRemove()
};
removeById("5c114cf35d75670c5c0c41a8", console.log);
//Delete many records
var removeMany = (nameToRemove, done) => {
    Person.deleteMany({ name: nameToRemove }, (err, data) => (err)? done(err): done(null, data));
};
removeMany("Sam", console.log);
//Chain Search Query Helpers to Narrow Search Results
var queryChain = (foodToSearch, done) => {
    //You can store the query in a variable for later use, this kind of object enables you to build up a query using chaining syntax
    Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => (err)? done(err): done(null, data)); 
    //sort, 1 for ascending, -1 for descending
    //select, 0 means hide, 1 means show
    //exec(callback), at the end to execute with callback
};
queryChain("Apple", console.log);
//To listen on port 3000
app.listen(3000);

module.exports = app;