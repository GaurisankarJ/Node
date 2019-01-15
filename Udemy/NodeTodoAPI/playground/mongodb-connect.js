// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

//Creating new object id's
var obj = new ObjectID();
console.log(obj);

//ES6 destructuring
var user = { name: "Sankar", age: 22 };
var { name } = user;
console.log(name);

//To open connection
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server!", err);
    }
    console.log("Connected to MongoDB server!");
    const db = client.db("TodoApp");

    // db.collection("Todos").insertOne({
    //     text: "Something to do",
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log("Unable to insert!", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection("Users").insertOne({
    //     name: "Sankar",
    //     age: 22
    // }, (err, result) => {
    //     if(err) {
    //         return console.log("Unable to insert!", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());//To extract timestamp
    // });
    //To close connection
    client.close();
});