"use strict";

var express = require("express");
var app = express();
require("dotenv").config();
var cors = require("cors");
var bodyParser = require("body-parser");
var dns = require("dns");
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
var urlSchema = new Schema({
    original_url: String,
    short_url: { type: Number, distinct: true, unique: true }
}, { timestamps: true });
var URL = mongoose.model("URL", urlSchema);
var initialData = [
    {
        original_url: "http://www.google.com",
        short_url: 1
    },
    {
        original_url: "http://www.youtube.com",
        short_url: 2
    }
];
URL.create(initialData, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Initialized!");
    }
});
app.get("/:shortURL(*)", (req, res) => {
    var shortURL = req.params.shortURL;
    URL.findOne({ short_url: shortURL }, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            if (data == null) {
                res.send(404);
            } else {
                res.statusCode = 302;
                res.setHeader("Location", data.original_url);
                res.end();
            }
        }
    });
    console.log(shortURL);
});
app.post("/api/shorturl/new", (req, res, next) => {
    var originalURL = req.body.url;
    var regex = /^http:\/\/www\.[\w.-]+\.com$/;
    if(regex.test(originalURL)) {
        URL.findOne({ original_url: originalURL }, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                if(data == null) {
                    var shortURL = Math.floor(Math.random() * 100).toString();
                    var addURL = new URL({
                        original_url: originalURL,
                        short_url: shortURL
                    });
                    addURL.save((err, data) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("Record Added!");
                        }
                    });
                    req.shortURL = shortURL;
                    next();
                } else {
                    req.shortURL = data.short_url;
                    next();
                }
            }
        });
    }
}, (req, res) => {
    var originalURL = req.body.url;
    var regex = /^http:\/\/www\.[\w.-]+\.com$/;
    if(regex.test(originalURL)) {
        res.json({
            "original_url": originalURL,
            "short_url": req.shortURL
        });
    } else {
        res.json({
            "error": "Invalid URL"
        });
    }
});

var listener = app.listen(process.env.PORT, () => {
    console.log("Application is listening on port " + listener.address().port)
});
