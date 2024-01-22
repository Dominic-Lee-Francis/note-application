class NoteServer {
    constructor(file, fs) {
      this.file = file;
      this.fs = fs;
      this.note = {};
      this.init();     
    }
  
    init() {
      new Promise((resolve, reject) => {
        this.read().then((data) => {
          this.note = data;
        });
      });
    }

    read() {
        return new Promise((resolve, reject) => {
          this.fs.readFile(this.file, "utf-8", (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(JSON.parse(data));
          });
        });
      }

    list() {
        return new Promise((resolve, reject) => {
          if (this.note) {
            resolve(this.note);
            console.log(this.note);
          } else {
            reject("Note is not available.");
          }
        });
      }
};

module.exports = NoteServer;