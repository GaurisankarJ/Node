const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

require("./config/config.js");
const { mongoose, ObjectID } = require("./db/mongoose.js");
const { User } = require("./models/user.js");
const { Todo } = require("./models/todo.js");
const { authenticate } = require("./middleware/authenticate.js");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos", authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id }).then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos/:id", authenticate, (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID!");
    }
    Todo.findOne({ _id: id, _creator: req.user._id }).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.delete("/todos/:id", authenticate, (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID!");
    }
    Todo.findOneAndDelete({ _id: id, _creator: req.user._id }).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch("/todos/:id", authenticate, (req, res) => {
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
    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new:true }).then((todo) => {
        if(!todo) {
            res.status(404).send("User not found!");
        }
        res.status(200).send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.post("/users", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});

app.post("/users/login", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header("x-auth", token).send(user);
        });
    }).catch((err) => {
        res.status(400).send("Error!");
    });
});

app.delete("/users/me/token", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send("Token Deleted!");
    }, () => {
        res.status(400).send("Error!");
    });
});

var listener = app.listen(port, () => {
    console.log(`Server running on port ${listener.address().port}!`);
});

module.exports = { app };