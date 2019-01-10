// console.log("Starting Notes Application....");
// console.log(module);

// module.exports.age = (age) => {
//     return age;
// };
const fs = require("fs");

var fetchNotes = () => {
    //Read existing file 
    try {
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (err) {
        console.log(err);
        return [];
    }
};
var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    //Check for duplicate titles
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};
var getAll = () => {
    return fetchNotes();
};
var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title === title;
    });
    return filteredNotes[0];
};
var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title !== title;
    });
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote,//addNotes: addNotes
    getAll,
    getNote,
    removeNote
};