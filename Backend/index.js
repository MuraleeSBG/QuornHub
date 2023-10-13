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
  con.query("SELECT * FROM QuornhubDb.recipes", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("all works")
    });
});


app.get('/api/:id', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE id = ?", [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    console.log("id works")
  });
});

app.get('/vegan', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isVegan = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("vegan works")
    });
});

app.get('/gluten', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isGlutenFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("gluten works")
    });
});

app.get('/nut', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isNutFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("nut works")
    });
});

app.get('/lactose', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isLactoseFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("lactose works")
    });
});

app.get('/u15', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isUnder15 = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("u15 works")
    });
});

app.delete('/api/:id', (req, res) => {
  if (req.params.id) {
    con.query("DELETE FROM QuornhubDb.recipes WHERE id = ?", [req.params.id], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("delete works")
    });
  }
});

/*
app.post('/createrecipe', (req, res) => {
  console.log(req.body);
  if (req.body) {
    con.query("INSERT INTO QuornhubDb.recipes (recipeName, recipeImg, recipeDesc, isVegan, isGlutenFree, isNutFree, isLactoseFree, isUnder15, ingredients, method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.recipeName, req.body.recipeImg, req.body.recipeDesc, req.body.isVegan, req.body.isGlutenFree, req.body.isNutFree, req.body.isLactoseFree, req.body.isUnder15, req.body.ingredients, req.body.method], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("post works")
    });
  }
});
*/