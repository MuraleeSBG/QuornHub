const bcrypt = require("bcrypt")
const saltRounds = 10
const userPassword = "Admin@123"

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(userPassword, salt);

console.log(salt)
console.log(hash)


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpass",
  database: "QuornhubDb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO users (id, name, email, password, admin) VALUES ('3', 'test user 1', 'test1@email.com', '"+hash+"', '0')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});