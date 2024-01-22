const express = require('express'); // import express
const app = express(); // create an express server

class NoteRouter {
    constructor() {
    }

    init() {
        app.get("/", function (req, res) {
            res.render("home", {
            });
        });
    }
    
}

module.exports = NoteRouter;
