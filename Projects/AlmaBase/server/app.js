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
// Use the routes
app.use("/api", routes);

// Export app
export default app;

console.log("Executing Server: app.js ...");
