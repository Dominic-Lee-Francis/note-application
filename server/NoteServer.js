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
            console.log(data);
          });
        });
      }
};

module.exports = NoteServer;