const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    // Emit an event to a single node
    socket.emit("newMessage", {
        from: "sankar@example.com",
        text: "Hellllooooo!",
        createdAt: 123
    });

    socket.emit("newEmail", {
        from: "sankar@example.com",
        text: "Hey there!",
        createdAt: 123
    });

    socket.on("createEmail", (createEmail) => {
        console.log("Create Email!", createEmail);
    });

    // Emit an event to all sockets in the network
    io.emit("newMessage", generateMessage(message.from, message.text));

    // Emit an event to all sockets but the invoking socket in the network
    socket.broadcast.emit("newMessage", {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });

    // Emitting to all sockets in a room
    io.to(params.room).emit("newMessage", "Room Emit!");

    // Emitting to all sockets but the invoking socket
    socket.broadcast.to(params.room).emit("newMessage", "Room Emit!");

    // io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
});
