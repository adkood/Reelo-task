const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

module.exports = conn.promise();
