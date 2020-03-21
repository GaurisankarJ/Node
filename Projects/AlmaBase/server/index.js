// Express Web Application Framework
const express = require("express");
import app from "./app";

// HTTP/1
const listener = app.listen(process.env.port, () => {
    console.log(`(HTTP)Server running on port ${listener.address().port}!`);
});

console.log("Executing Server: index.js ...");
console.log("");
