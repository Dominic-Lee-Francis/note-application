const NoteServices = require('./server/NoteServices');
const noteServices = new NoteServices();
const fs = require('fs');
const path = require('path');


noteServices.read();
