const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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
	password: "rootpass",
	port: 3306,
	database: "QuornhubDb",
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get("/api", (req, res) => {
	con.query("SELECT * FROM recipes", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
		console.log("all works")
	});
});

app.get("/api/id/:id", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE id = ?",
		[req.params.id],
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("id works");
		}
	);
});

app.get("/api/vegan", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE isVegan = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("vegan works");
		}
	);
});

app.get("/api/gluten", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE isGlutenFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("gluten works");
		}
	);
});

app.get("/api/nut", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE isNutFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("nut works");
		}
	);
});

app.get("/api/lactose", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE isLactoseFree = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("lactose works");
		}
	);
});

app.get("/api/u15", (req, res) => {
	con.query(
		"SELECT * FROM recipes WHERE isUnder15 = 1",
		function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			console.log("u15 works");
		}
	);
});

app.delete("/api/id/:id", (req, res) => {
	if (req.params.id) {
		con.query(
			"DELETE FROM recipes WHERE id = ?",
			[req.params.id],
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
			"INSERT INTO recipes (recipeName, recipeImg, recipeDesc, isVegan, isGlutenFree, isNutFree, isLactoseFree, isUnder15, ingredients, method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

app.post("/api/user", jsonParser, async function (req, res) {
	const { email, password, name, admin } = req.body;
	if (!email || !password || !name) {
		return res.status(400).send({
			message: "Email, name and password are required",
		});
	}
	try {
		var emailLower = email.toLowerCase();

		con.query(
			"SELECT COUNT(*) AS count FROM users WHERE email = ?",
			[emailLower],
			function (err, result, fields) {
				if (err) throw err;
				if (result[0].count > 0) {
					return res.status(400).send({
						message: "Email already exists",
					});
				}

				const salt = bcrypt.genSaltSync(10);
				var hashedpass = bcrypt.hashSync(password, salt);
				con.query(
					"INSERT INTO users (id, name, password, email, admin) VALUES (UUID(), ?, ?, ?, ?)",
					[name, hashedpass, emailLower, admin || false],
					function (err, result, fields) {
						if (err) throw err;
						res.status(200).send({
							message: "User created successfully",
						});
					}
				);
			}
		);
	} catch (err) {
		return res.status(400).send({
			message: err.message,
		});
	}
});
