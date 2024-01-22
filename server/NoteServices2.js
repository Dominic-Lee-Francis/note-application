class NoteServices2 {
    constructor() {
        // imports built in Node.js fs module, which provides an api for interacting with the file system.
        // put at top of script
        this.fs = require('fs');
        // imports built in Node.js path module, which provides utility for working with files and directory paths.
        this.path = require('path');
        // stores the file path in the file property.
        this.noteLocation = "../Database/db.json";
        this.note = require(this.noteLocation);
        this.stringifyNote = JSON.stringify(this.note);
        this.finalNote = this.stringifyNote;
        console.log("this.noteName: ", this.noteName);
    }

    add(notes, user) {
        if (this.finalNote[user] === undefined) {
          this.finalNote[user] = [];
        }
        this.finalNote[user].push(notes);
        return this.write();
    }

}

NoteServices2();

module.exports = NoteServices2;