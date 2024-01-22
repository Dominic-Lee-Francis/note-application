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

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: 'Note App'
}));
