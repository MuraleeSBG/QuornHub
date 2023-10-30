const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const cors = require('cors')

app.use(cors({
  origin: "http://localhost:3000"
}));
 
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


app.get('/api/id/:id', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE id = ?", [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    console.log("id works")
  });
});

app.get('/api/vegan', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isVegan = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("vegan works")
    });
});

app.get('/api/gluten', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isGlutenFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("gluten works")
    });
});

app.get('/api/nut', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isNutFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("nut works")
    });
});

app.get('/api/lactose', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isLactoseFree = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("lactose works")
    });
});

app.get('/api/u15', (req, res) => {
  con.query("SELECT * FROM QuornhubDb.recipes WHERE isUnder15 = 1", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("u15 works")
    });
});

/*
app.delete('/api/id/:id', (req, res) => {
  if (req.params.id) {
    con.query("DELETE FROM QuornhubDb.recipes WHERE id = ?", [req.params.id], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("delete works")
    });
  }
});

OLD CODE: PARAMETERS IN URL

*/

app.delete('/api', jsonParser, function (req, res) {
  if (req.body.recipeId) {
    con.query("DELETE FROM QuornhubDb.recipes WHERE id = ?", [req.body.recipeId], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("delete works")
    });
  }
});

app.post('/api', jsonParser, function (req, res) {
  console.log(req.body.recipeName);
  if (req.body.recipeName) {
    con.query("INSERT INTO QuornhubDb.recipes (recipeName, recipeImg, recipeDesc, isVegan, isGlutenFree, isNutFree, isLactoseFree, isUnder15, ingredients, method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.recipeName, req.body.recipeImg, req.body.recipeDesc, req.body.isVegan, req.body.isGlutenFree, req.body.isNutFree, req.body.isLactoseFree, req.body.isUnder15, req.body.ingredients, req.body.method], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("post works")
    });
  }
});

app.put('/api', jsonParser, function (req, res) {
  console.log(req.body.recipeId);
  if (req.body.recipeId) {
    con.query("UPDATE QuornhubDb.recipes SET recipeName = ?, recipeImg = ?, recipeDesc = ?, isVegan = ?, isGlutenFree = ?, isNutFree = ?, isLactoseFree = ?, isUnder15 = ?, ingredients = ?, method = ? WHERE id = ?", [req.body.recipeName, req.body.recipeImg, req.body.recipeDesc, req.body.isVegan, req.body.isGlutenFree, req.body.isNutFree, req.body.isLactoseFree, req.body.isUnder15, req.body.ingredients, req.body.method, req.body.recipeId], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      console.log("put works")
    });
  }
});
