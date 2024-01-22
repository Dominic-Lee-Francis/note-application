const fs = require('fs');

function myAuthorizer(username, password, callback) {
    const USERS = fs.readFileSync('./database/users.json', 'utf-8');
    let parsed = JSON.parse(USERS);
    let user = parsed.users.filter((user) => user.username === username);

    if (user.length > 0 && user[0].username === username && user[0].password === password) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
}

module.exports = myAuthorizer;