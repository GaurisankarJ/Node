const socket = io();

socket.emit("createEmail", {
    to: "sankar@example.com",
    text: "Hey hey!"
});

socket.emit("createMessage", {
    from: "sankar@example.com",
    text: "Hellooo!"
}, function (data) {
    console.log("Got It!", data);
});

socket.on("newEmail", function (email) {
    console.log("New Email!", email);
});
