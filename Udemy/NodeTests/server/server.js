const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/user", (req, res) => {
    res.status(404).json({
        error: "Page not found."
    });
});

app.get("/users", (req, res) => {
    res.json([
        {
            name: "Sankar",
            age: 22
        },
        {
            name: "JD",
            age: 22
        }
    ]);
});

var listener = app.listen(port, () => {
    console.log(`Server is running on port ${listener.address().port}!`);
});

module.exports.app = app;