const express = require('express'); // import express
const app = express(); // create an express server

class NoteRouter {
    constructor(note) {
        this.note = note;
        this.express = express;
    }
}

module.exports = NoteRouter;
