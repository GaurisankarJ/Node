"use strict";

var express = require("express");
var app = express();
require("dotenv").config();
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static(__dirname + "/src"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile("/src/index.html");
});
//MongoDB
mongoose.connect(process.env.MONGO_URI);
var Schema = mongoose.Schema;
var exerciseSchema = new Schema({
    
}, { timestamps: true });
var ExerciseTracker = mongoose.model("Exercise Tracker", exerciseSchema);
app.get("/:shortURL(*)", (req, res) => {
    
});
app.post("/api/shorturl/new", (req, res, next) => {
    
}, (req, res) => {
    
});

var listener = app.listen(process.env.PORT, () => {
    console.log("Application is listening on port " + listener.address().port)
});
