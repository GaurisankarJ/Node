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

// ###################################################################
// Routes
// ###################################################################
const { getRepos } = require("./routes/gitController.js");
// ###################################################################

// Create Express app
const app = express();
// Define PORT
const PORT = 3000;

// Use CORS
app.use(cors());
// Use the body-parser middleware for JSON data
app.use(bodyParser.json());
// Use the logger
app.use(logger("combined", {
    stream: fs.createWriteStream("./server/logs/server.log", { flags: "a" })
}));

// ###################################################################
app.get("/:org", (req, res) => getRepos(req, res));
// ###################################################################

// HTTP/1
const listener = app.listen(PORT, () => {
    console.log(`(HTTP)Server running on port ${listener.address().port}!`);
});
