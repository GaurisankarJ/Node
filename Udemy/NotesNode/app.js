console.log("Starting NodeJS Application....")

const fs = require("fs");
const os = require("os");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

// var user = () => {
//     var userName = os.userInfo().username;
//     userName = userName.substring(0, 1).toUpperCase() + userName.substring(1);
//     return userName;
// };

//Async
// fs.appendFile("greetings.txt", `\nHello ${user()}! You are ${notes.age(21)} years old!`, (err) => {
//     if(err) {
//         console.log(err);
//     }
// });

//Sync
// fs.appendFileSync("greetings.txt", "Hello FS Sync!!");

// console.log(_.isString(notes.age(45)));
// console.log(_.uniq([2, 1, 3, 2, 1]));

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: "t"
};
const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: "b"
};
const argv = yargs
    .command("add", "Add a new note", {
        title: titleOptions,
        body: bodyOptions
    })
    .command("list", "List all notes")
    .command("read", "Read a note", {
        title: titleOptions
    })
    .command("remove", "Remove a note", {
        title: titleOptions
    })
    .help()
    .argv;
const command = argv._[0];//const command = process.argv[2];
console.log("Process: ", process.argv);
console.log("Yargs: ", argv);

if(command == "add") {
    var note = notes.addNote(argv.title, argv.body);
    if(_.isUndefined(note)) {
        console.log("Error, title already exists!");
    } else {
        console.log("Note created successfully!");
        console.log("--------------------------");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
} else if(command == "list") {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)!`);
    allNotes.forEach((note, i) => {
        console.log(`Note ${i + 1}`);
        console.log("----------");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    });
} else if(command == "read") {
    var note = notes.getNote(argv.title);
    if(note) {
        console.log("Note read successfully!");
        console.log("-----------------------");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log("Error, note not found!")
    }
} else if(command == "remove") {
    var noteRemoved = notes.removeNote(argv.title);
    if(noteRemoved) {
        console.log("Note removed successfully!");
    } else {
        console.log("Note does not exist!");
    }
} else {
    console.log("Invalid Command......")
}