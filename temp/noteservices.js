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
            // checks if parsedData is an array
            if (!Array.isArray(parsedData)) {
                reject("Invalid data format.");
                return;
            }
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