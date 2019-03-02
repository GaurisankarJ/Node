const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// Functions for message generation
const { generateMessage, generateLocationMessage } = require("./utils/message");
// Function for string validation
const { isRealString } = require("./utils/validation");
// Class for users
const { Users } = require("./utils/users");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "/../public");
const app = express();
// Creating server with express
const server = http.createServer(app);
// Integrating socket.io with server
const io = socketIO(server);
// Setting up users
const users = new Users();

app.use(express.static(publicPath));

// Handle connecting
io.on("connection", (socket) => {
    console.log("Client Connected!");

    // Handle joining a room
    socket.on("join", (params, callback) => {
        // Verifying whether parameters are valid
        if (!isRealString(params.name) || !isRealString(params.room)) {
            // Returning an error to client
            return callback("Name and Room Name are required!");
        }

        // Joining a room
        socket.join(params.room);
        // Leaving a room
        // socket.leave(params.room);
        // Removing all existing users with same socket id
        users.removeUser(socket.id);
        // Adding a new user to users
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the ChatApp!"));

        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined the ChatRoom!`));

        callback();
    });

    socket.on("createMessage", (message, callback) => {
        const user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    // Handle disconnecting
    socket.on("disconnect", () => {
        console.log("Client Disconnected!");

        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the ChatRoom!`));
        }
    });
});

// app.get("/home", (req, res) => {
//     res.sendFile(path.join(publicPath, "index.html"));
// });

const listener = server.listen(port, () => {
    console.log(`Server running on port ${listener.address().port}!`);
});
