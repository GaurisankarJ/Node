const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodosApp");

var todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var Todo = mongoose.model("Todo", todoSchema);
var User = mongoose.model("User", userSchema);

var newTodo = new Todo({
    text: "Trim the dog",
    completed: false
});

newTodo.save().then((doc) => {
    console.log("Saved Todo!", doc);
}, (err) => {
    console.log("Unable to save document!", err);
});

var newUser = new User({
    email: "sankar@example.com"
});

newUser.save().then((doc) => {
    console.log("Saved User!", doc);
}, (err) => {
    console.log("Unable to save user!", err);
});