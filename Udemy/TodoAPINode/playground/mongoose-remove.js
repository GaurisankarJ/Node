const { ObjectID } = require("mongodb");

const mongoose = require("./../server/db/mongoose.js");
const { Todo } = require("./../server/models/todo.js");

Todo.deleteMany({}).then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

Todo.findByIdAndDelete("5c406ca13702d5ecc274a4a3").then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

Todo.findOneAndDelete({ _id: "5c406cfeeaa413ed62a9aa56" }).then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});