const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  app.get('/api', (req, res) => {
    con.query("SELECT * FROM QuornhubDb.new_table", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("works")
      });
  });


  app.get('/api/:id', (req, res) => {
    con.query("SELECT * FROM QuornhubDb.new_table WHERE idnew_table = ?", [req.params.id], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("works")
    });
});
