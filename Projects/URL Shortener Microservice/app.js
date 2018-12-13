"use strict";

var express = require("express");
var app = express();
require("dotenv").config();

app.use(express.static(__dirname + "/src"));

app.get("/", (req, res) => {
    res.sendFile("/src/index.html");
});


var listener = app.listen(process.env.PORT, () => {
    console.log("Application is listening on port " + listener.address().port)
});
