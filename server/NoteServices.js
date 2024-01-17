class NoteServices {
    constructor(file, fs) {
        // imports built in Node.js fs module, which provides an api for interacting with the file system.
        this.fs = require('fs');
        // imports built in Node.js path module, which provides utility for working with files and directory paths.
        this.path = require('path');
        // stores the file path in the file property.
        this.file = file;
        // provides an empty object to store the data read from the file.
        this.note = {};
        // calls the init() method to initialize the module.
        this.init();
    }

    /*
    * INIT FUNCTION
    * initialize the module NoteServices by reading the file and then storing it in the note property.
    */
 
    init() {
        // starts bt creating a new promise object that lets us handle the process asynchronously.
        new Promise((resolve, reject) => {
            // call the read method and then resolve the promise.
            // .then() is a callback function that is called when the promise is resolved.
            // it receives the data read by the file
            this.read().then((data) => {
                // data is assigned to the note property
                this.note = data;
                // resolve the promise and indicate that the process is completed successfully.
                resolve();
            });
        });
    }


    /*
    * READ FUNCTION
    */
    read() {
        console.log('reading file');
        // creates and returns a new promise. A promise is an object that represents the eventual completion of an asynchronous operation.
        return new Promise((resolve, reject) => {
            // directs the fs module to read the database json file
            this.fs.readFile('./db.json', 'utf8', (err, data) => {
                // if an error occurs, the promise is rejected and the error is returned
                if (err) {
                    reject(err);
                    console.log("error reading file");
                }
                // if no error occurs, the data is parsed
                const parsedData = JSON.parse(data);
                // the promise is fulfilled and the parsed data is returned
                resolve(parsedData);
                console.log("file read successfully");
            });
        });
    }
}


module.exports = NoteServices;