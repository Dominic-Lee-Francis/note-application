// this is the server side of the note app. 
// It is responsible for reading the notes.json file and returning the data to the client side. 
class NoteServer {
    // a class constructor takes in two parameters: file and fs.
    // file is the path to the notes.json file and is declared in app.js.
    // fs is the file system module imported in app.js also declared in app.js
    constructor(file, fs) {
      // turns the file and fs parameters into properties of the class using the this keyword.
      this.file = file;
      this.fs = fs;
      // initializes the note property to an empty object. 
      // This will be populated with the data from the notes.json file using the init() method.
      this.note = {};
      this.init();     

    }
  
//  The init() method is called in the constructor.
//  It calls the store() method which returns a promise.
//  the promise is not resolved because the store() method is asynchronous and so the store method is wrapped in a promise.
    init() {
      new Promise((resolve, reject) => {
        // the store() method is called and then the data is assigned to the note property.
        this.store().then((data) => {
          this.note = data;
        });
      });
    }


// the store() method is called from the init method and its role is to read the notes.json file and return the data.
    store() {
        // the store method returns a promise because it is asynchronous.
        return new Promise((resolve, reject) => {
          // the fs module is used to read the notes.json file.
          this.fs.readFile(this.file, "utf-8", (err, data) => {
            // if there is an error, the promise is rejected.
            if (err) {
              reject(err);
              console.log("Store method error: ", err);
            }
            // if there is no error, the promise is resolved and the data is parsed.
            // the data is parsed because the data is in JSON format and needs to be converted to a JavaScript object.
            resolve(JSON.parse(data));
            // error checking, comment out later
            // console.log("Store method resolved: ", data);
          });
        });
      }

    listNotes(user) {
      return this.store().then(() => {
        if (this.note[user] === undefined) {
          return [];
        }
        return this.note[user];
      });
    }

      // listNotes(user) {
      //   return this.read().then(() => {
      //     if (this.note[user] === undefined) {
      //       return [];
      //     }
      //     return this.note[user];
      //   });
      // }
};

module.exports = NoteServer;