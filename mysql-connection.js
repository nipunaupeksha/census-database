var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "census",
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Census!");
});

module.exports = connection;