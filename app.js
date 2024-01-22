// const NoteServices = require('./server/NoteServices');
// const noteServices = new NoteServices();

// const NoteServices2 = require('./server/NoteServices');
// const noteServices2 = new NoteServices2();

// const fs = require('fs');
// const path = require('path');

// const NoteServer2 = require('./server/NoteServices2');

// const note = new NoteServices2(__dirname + "./Database/db.json", fs);

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const basicAuth = require('express-basic-auth');
const NoteRouter = require('./Router/NoteRouter');
const NoteServer = require('./server/NoteServer');
const myAuthorizer = require('./authentication/authentication');
const fs = require("fs");
const path = require("path");
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: 'Note App'
}));

const note = new NoteServer(__dirname + "/database/notes.json", fs);

app.get("/", function (req, res) {
    res.render("home", {
    });
});

app.listen(port, () => {
        console.log(`Server started on port ${port}`);
});