const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

require("./config/config.js");
const { mongoose, ObjectID } = require("./db/mongoose.js");
const { User } = require("./models/user.js");
const { Todo } = require("./models/todo.js");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID!");
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send("Error!");
    });
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID!");
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send("Error!");
    });
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID!");
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new:true }).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send("Error!");
    });
});

var listener = app.listen(port, () => {
    console.log(`Server running on port ${listener.address().port}!`);
});

module.exports = { app };