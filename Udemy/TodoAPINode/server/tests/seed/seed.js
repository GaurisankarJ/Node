const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        "_id": userOneId,
        "email": "sankar@example.com",
        "password": "userOnePass",
        "tokens": [{
            "access": "auth",
            "token": jwt.sign({ _id: userOneId.toHexString(), access: "auth" }, process.env.JWT_SECRET).toString()
        }]
    },
    {
        "_id": userTwoId,
        "email": "sankar1@example.com",
        "password": "userTwoPass",
        "tokens": [{
            "access": "auth",
            "token": jwt.sign({ _id: userTwoId.toHexString(), access: "auth" }, process.env.JWT_SECRET).toString()
        }]
    }
];

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo",
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: "Second test todo",
        _creator: userTwoId,
        completed: true,
        completedAt: 333
    }
];

//To clear and repopulate database before every test
const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        //insertMany won't run the middleware
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        //Wait for all promises mentioned in array to be resolved
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
