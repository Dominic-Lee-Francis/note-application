const { resolve } = require('path');


class NoteServices {
    constructor(file) {
        // imports built in Node.js fs module, which provides an api for interacting with the file system.
        // put at top of script
        this.fs = require('fs');
        // imports built in Node.js path module, which provides utility for working with files and directory paths.
        this.path = require('path');
        // stores the file path in the file property.
        this.file = file;
        // provides an empty object to store the data read from the file.
        this.note = {};
        // calls the init() method to initialize the module.
        this.init();
        // this.read();
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
            this.read().then((parsedData) => {
                // data is assigned to the note property
                console.log("parsedData in init", parsedData);
                this.note = parsedData;
                // resolve the promise and indicate that the process is completed successfully.
                resolve();
            });
        });
    }


    /*
    * READ FUNCTION
    */
    read() {
        // creates and returns a new promise. A promise is an object that represents the eventual completion of an asynchronous operation.
        return new Promise((resolve, reject) => {
            // directs the fs module to read the database json file
            this.fs.readFile('./Database/db.json', 'utf8', (err, data) => {
                // if an error occurs, the promise is rejected and the error is returned
                if (err) {
                    reject(err);
                    console.log("error reading file");
                }
                // if no error occurs, the data is parsed
                console.log("Data, not parsed: ", data);
                const parsedData = JSON.parse(data);
                // the promise is fulfilled and the parsed data is returned
                console.log("Data, parsed: ", parsedData);
                
                resolve(parsedData);
                
            });
        });
    }

    /*
    * List all Notes Function
    */
    list() {
        // returns a new promise that resolves with the note property
        return new Promise((resolve, reject) => {
            if (this.note) {
                resolve(this.note);
                console.log("List:", this.note);                
            } else {
                reject("Note is not available.");
            }
        });
    }

    /*
    * CREATE FUNCTION
    */
    create(user) {
        // returns a new promise that resolves after pushing the new user to the database
        return new Promise((resolve, reject) => {
            // reads the existing data from the database json file
            this.fs.readFile('./Database/db.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    console.log("error reading file");
                }
                // parses the existing data
                const parsedData = JSON.parse(data);
                console.log("parsedData in create", parsedData);
                // pushes the new user to the parsed data
                parsedData.push(user);
                console.log("parsedData in create after push", parsedData);
                // converts the updated data to a JSON string
                const updatedData = JSON.stringify(parsedData);
                console.log("updatedData in create", updatedData);
                // writes the updated data to the database json file
                this.fs.writeFile('./Database/db.json', updatedData, 'utf8', (err) => {
                    if (err) {
                        reject(err);
                        console.log("error writing file");
                    }
                    // resolves the promise after successfully pushing the new user to the database
                    resolve();
                });
            });
        });
    }

    /*
    * WRITE FUNCTION
    */
    deleteDB() {
        // creates and returns a new promise
        return new Promise((resolve, reject) => {
            // converts the note object to a JSON string
            const jsonData = JSON.stringify(this.note);
            console.log(jsonData);
            // writes the JSON string to the database json file
            this.fs.writeFile('./Database/db.json', jsonData, 'utf8', (err) => {
                // if an error occurs, the promise is rejected and the error is returned
                if (err) {
                    reject(err);
                    console.log("error writing file");
                }
                // if no error occurs, the promise is fulfilled
                resolve();
            });
        });
    }
}

module.exports = NoteServices;