const NoteServices = require('./server/NoteServices');
const noteServices = new NoteServices();
const fs = require('fs');
const path = require('path');

const note = new NoteServices(__dirname + "./Database/db.json", fs);


noteServices.create({"user": "test", "note": "test note"});
