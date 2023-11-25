const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "question",
    password: "Negi@1234",
});

conn.connect((err) => {
    if(err) throw err;
    console.log("connected to database");
});

module.exports = conn.promise();