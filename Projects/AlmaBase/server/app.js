// Express Web Application Framework
const express = require("express");
// Cross-Origin Resource Sharing
const cors = require("cors");
// Request Body Parsing Middleware
const bodyParser = require("body-parser");
// File System
const fs = require("fs");
// Morgan Logger
const logger = require("morgan");
// Routes
const route = require("./routes");

// Create Express app
const app = express();

// Use CORS
app.use(cors());
// Use the body-parser middleware for JSON data
app.use(bodyParser.json());
// Use the logger
app.use(logger("combined", {
    stream: fs.createWriteStream("./server/logs/server.log", { flags: "a" })
}));
// Use the route
app.use("/", route);

// HTTP/1
app.listen(3000, () => {
    // console.log("(HTTP)Server running on port 3000");
});

// Export Express app
module.exports = app;

// console.log("Executing Server: app.js ...");
// console.log("");
