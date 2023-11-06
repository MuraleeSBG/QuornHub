const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const cors = require("cors");

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "rootpass",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get("/api", (req, res) => {
	con.query("SELECT * FROM QuornhubDb.recipes", function (err, result, fields) {
		if (err) throw err;
    // we need to transform the result an array of objects
    const parsedResult = result.map((recipe) => {
      return {
        id: recipe.id,
        recipeName: recipe.recipeName,
        recipeImg: recipe.recipeImg,
        recipeDesc: recipe.recipeDesc,
        isVegan: recipe.isVegan,
        isGlutenFree: recipe.isGlutenFree,
        isNutFree: recipe.isNutFree,
        isLactoseFree: recipe.isLactoseFree,
        isUnder15: recipe.isUnder15,
        ingredients: JSON.parse(recipe.ingredients) ,
        method: recipe.method
      }
    })
		res.send(parsedResult);
		console.log("all works");
	});
});

app.get("/api/id/:id", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE id = ?", 
		[req.params.id], 
		function (err, result) {
			if (err) throw err;
			const parsedResult = result.map((recipeAttribute) => {
				return {
				  id: recipeAttribute.id,
				  recipeName: recipeAttribute.recipeName,
				  recipeImg: recipeAttribute.recipeImg,
				  recipeDesc: recipeAttribute.recipeDesc,
				  isVegan: recipeAttribute.isVegan,
				  isGlutenFree: recipeAttribute.isGlutenFree,
				  isNutFree: recipeAttribute.isNutFree,
				  isLactoseFree: recipeAttribute.isLactoseFree,
				  isUnder15: recipeAttribute.isUnder15,
				  ingredients: JSON.parse(recipeAttribute.ingredients) ,
				  method: recipeAttribute.method
				}
			  })
				  res.send(parsedResult);
				  console.log("all works");
			  });
		  });

app.get("/api/vegan", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE isVegan = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("vegan works");
		}
	);
});

app.get("/api/gluten", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE isGlutenFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("gluten works");
		}
	);
});

app.get("/api/nut-free", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE isNutFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("nut works");
		}
	);
});

app.get("/api/lactose-free", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE isLactoseFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("lactose works");
		}
	);
});

app.get("/api/u15", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE isUnder15 = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("u15 works");
		}
	);
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

app.delete("/api", jsonParser, function (req, res) {
	if (req.body.recipeId) {
		con.query(
			"DELETE FROM QuornhubDb.recipes WHERE id = ?",
			[req.body.recipeId],
			function (err, result, fields) {
				if (err) throw err;
				res.send(result);
				console.log("delete works");
			}
		);
	}
});

app.post("/api", jsonParser, function (req, res) {
	console.log(req.body.recipeName);
	if (req.body.recipeName) {
		con.query(
			"INSERT INTO QuornhubDb.recipes (recipeName, recipeImg, recipeDesc, isVegan, isGlutenFree, isNutFree, isLactoseFree, isUnder15, ingredients, method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				req.body.recipeName,
				req.body.recipeImg,
				req.body.recipeDesc,
				req.body.isVegan,
				req.body.isGlutenFree,
				req.body.isNutFree,
				req.body.isLactoseFree,
				req.body.isUnder15,
				req.body.ingredients,
				req.body.method,
			],
			function (err, result, fields) {
				if (err) throw err;
				res.send(result);
				console.log("post works");
			}
		);
	}
});

app.put("/api", jsonParser, function (req, res) {
	console.log(req.body.recipeId);
	if (req.body.recipeId) {
		con.query(
			"UPDATE QuornhubDb.recipes SET recipeName = ?, recipeImg = ?, recipeDesc = ?, isVegan = ?, isGlutenFree = ?, isNutFree = ?, isLactoseFree = ?, isUnder15 = ?, ingredients = ?, method = ? WHERE id = ?",
			[
				req.body.recipeName,
				req.body.recipeImg,
				req.body.recipeDesc,
				req.body.isVegan,
				req.body.isGlutenFree,
				req.body.isNutFree,
				req.body.isLactoseFree,
				req.body.isUnder15,
				req.body.ingredients,
				req.body.method,
				req.body.recipeId,
			],
			function (err, result, fields) {
				if (err) throw err;
				res.send(result);
				console.log("put works");
			}
		);
	}
});


app.get('/api/user', (req, res) => {
	con.query("SELECT * FROM QuornhubDb.users", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
		console.log("get user works")
	});
});


app.post('/api/user', jsonParser, function (req, res) {
	if (req.body.password) {
		var emailLower = req.body.email.toLowerCase();
		var hashedpass = bcrypt.hashSync(req.body.password, salt);
		con.query("INSERT INTO QuornhubDb.users (name, password, email, admin) VALUES (?, ?, ?, ?)", [req.body.name, hashedpass, emailLower, req.body.admin], function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("create user works")
		});
	}
});

/*

app.put('/api/user', jsonParser, function (req, res) {
	if (req.body.password) {
		var hashedpass = bcrypt.hashSync(req.body.password, salt);
		con.query("UPDATE QuornhubDb.users SET name = ?, password = ?, email = ?, admin = ? WHERE id = ?", [req.body.name, hashedpass, req.body.email, req.body.admin, req.body.id], function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("update user works")
		});
	}
});

app.delete('/api/user', (req, res) => {
	  if (req.params.id) {
	con.query("DELETE FROM QuornhubDb.users WHERE id = ?", [req.params.id], function (err, result, fields) {
	  if (err) throw err;
	  res.send(result);
	  console.log("delete user works")
	});
  }
});

*/