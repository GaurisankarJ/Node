const { ObjectID } = require("mongodb");

const mongoose = require("./../server/db/mongoose.js");
const { Todo } = require("./../server/models/todo.js");

var id = "5c3e4920ead3c4c2e9bd889f";
if(!ObjectID.isValid(id)) {
    console.log("Invalid ID!");
}

Todo.find({
    _id: id
}).then((todos) => {
    if(todos.length === 0) {
        return console.log("ID not found!");
    }
    console.log("Todos\n", JSON.stringify(todos, undefined, 2));
}).catch((err) => {
    console.log("Invalid ID!")
});

Todo.findOne({
    _id: id
}).then((todo) => {
    if(!todo) {
        return console.log("ID not found!");
    }
    console.log("Todo\n", JSON.stringify(todo, undefined, 2));
}).catch((err) => {
    console.log("Invalid ID!")
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log("ID not found!");
    }
    console.log("Todo by ID\n", JSON.stringify(todo, undefined, 2));
}).catch((err) => {
    console.log("Invalid ID!")
});