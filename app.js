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

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const note = new NoteServer(__dirname + "/database/notes.json", fs);
const router = new NoteRouter(note, express);


// app.get("/", async (req, res) => {
//     note.listNotes(req.auth.user).then((notes) => {
//         console.log(notes);
//         res.render("index", {
//             user: req.auth.user,
//             notes: notes
//         });
//     });
// });

app.get("/", function (req, res) {
    note.listNotes(req.auth.user).then((notes) => {
        console.log(notes);
        res.render("home", {
            user: req.auth.user,
            notes: notes
        });
    });
});

app.use("/notes", router.router());

app.listen(port, () => {
        console.log(`Server started on port ${port}`);
});