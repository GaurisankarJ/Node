// Express Web Application Framework
const express = require("express");
// Controller
const gitController = require("./controller/gitController");

// Create Express routes
const route = express.Router();

// ###################################################################
route.get("/:org", (req, res) => gitController.get(req, res));
// ###################################################################

module.exports = route;

// console.log("Executing Server: routes.js ...");
// console.log("");
