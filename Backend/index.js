const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const jsonParser = bodyParser.json();
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const cors = require("cors");
const bcrypt = require("bcrypt");
const e = require("express");
const session = require("express-session");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(10);

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.static(__dirname));

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

app.get("/recipes", (req, res) => {
	const tag = req.query.tag;
	const extraTerm = (tag) => {
		switch (tag) {
			case "vegan":
				return "isVegan = 1";
			case "gluten-free":
				return "isGlutenFree = 1";
			case "nut-free":
				return "isNutFree = 1";
			case "lactose-free":
				return "isLactoseFree = 1";
			case "under-15":
				return "isUnder15 = 1";
			default:
				return undefined;
		}
	};
	const whereClause = extraTerm(tag) ? ` WHERE ${extraTerm(tag)}` : "";
	con.query(
		`SELECT * FROM QuornhubDb.recipes${whereClause}`,
		function (err, result, fields) {
			if (err) throw err;
			// we need to transform the result an array of objects
			const parsedResult = result.map((recipe) => {
				return {
					id: recipe.id,
					recipeName: recipe.recipeName,
					recipeImg: recipe.recipeImg,
					recipeDesc: recipe.recipeDesc,
					isVegan: recipe.isVegan,
					serves: recipe.serves,
					isGlutenFree: recipe.isGlutenFree,
					isNutFree: recipe.isNutFree,
					isLactoseFree: recipe.isLactoseFree,
					isUnder15: recipe.isUnder15,
					ingredients: JSON.parse(recipe.ingredients),
					method: recipe.method,
				};
			});
			res.send(parsedResult);
			console.log("all works");
		}
	);
});

app.get("/recipe/:id", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE id = ? LIMIT 1",
		[req.params.id],
		function (err, result) {
			if (err) throw err;
			const parsedResult = result.map((recipeAttribute) => {
				return {
					id: recipeAttribute.id,
					recipeName: recipeAttribute.recipeName,
					recipeImg: recipeAttribute.recipeImg,
					recipeDesc: recipeAttribute.recipeDesc,
					serves: recipeAttribute.serves,
					isVegan: recipeAttribute.isVegan,
					isGlutenFree: recipeAttribute.isGlutenFree,
					isNutFree: recipeAttribute.isNutFree,
					isLactoseFree: recipeAttribute.isLactoseFree,
					isUnder15: recipeAttribute.isUnder15,
					ingredients: JSON.parse(recipeAttribute.ingredients),
					method: recipeAttribute.method,
				};
			});
			if (parsedResult.length === 0) {
				return res.status(404).send({
					message: "Recipe not found",
				});
			}
			res.send(parsedResult[0]);
			console.log("all works");
		}
	);
});

app.delete("/recipe", jsonParser, function (req, res) {
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

app.post("/recipe", jsonParser, function (req, res) {
	try {
		const {
			recipeName,
			recipeImg,
			recipeDesc,
			tags,
			ingredients,
			method,
			serves,
		} = req.body;
		if (!recipeName || !recipeDesc || !ingredients || !method || !serves) {
			return res.status(400).send({
				message: "Recipe name, ingredients and method are required",
			});
		}
		console.log(req.body);
		const isVegan = tags.includes("Vegan");
		const isGlutenFree = tags.includes("Gluten Free");
		const isNutFree = tags.includes("Nut Free");
		const isLactoseFree = tags.includes("Lactose Free");
		const isUnder15 = tags.includes("< 15 Minutes");
		const recipeId = uuid.v4();
		con.query(
			"INSERT INTO QuornhubDb.recipes (id, recipeName, recipeImg, recipeDesc, serves, isVegan, isGlutenFree, isNutFree, isLactoseFree, isUnder15, ingredients, method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				recipeId,
				recipeName,
				recipeImg,
				recipeDesc,
				serves,
				isVegan,
				isGlutenFree,
				isNutFree,
				isLactoseFree,
				isUnder15,
				JSON.stringify(ingredients),
				method,
			],
			function (err, result, fields) {
				if (err) throw err;
				res.send({ recipeId });
			}
		);
	} catch (err) {
		return res.status(400).send({
			message: err.message,
		});
	}
});

app.put("/recipe/:recipeId", jsonParser, function (req, res) {
	if (req.params.recipeId) {
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
				req.params.recipeId,
			],
			function (err, result, fields) {
				if (err) throw err;
				res.send(result);
				console.log("put works");
			}
		);
	}
});

app.get("/users", (req, res) => {
	con.query("SELECT * FROM QuornhubDb.users", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
		console.log("get user works");
	});
});

app.post("/user", jsonParser, async function (req, res) {
	const { emailAddress, password, displayName, admin } = req.body;
	if (!emailAddress || !password || !displayName) {
		return res.status(400).send({
			message: "Email, name and password are required",
		});
	}
	try {
		var emailLower = emailAddress.toLowerCase();

		con.query(
			"SELECT COUNT(*) AS count FROM QuornhubDb.users WHERE email = ?",
			[emailLower],
			function (err, result, _fields) {
				if (err) throw err;
				if (result[0].count > 0) {
					return res.status(400).send({
						message: "Email already exists",
					});
				}

				const salt = bcrypt.genSaltSync(10);
				const hashedpass = bcrypt.hashSync(password, salt);
				con.query(
					"INSERT INTO QuornhubDb.users (id, name, password, email, admin) VALUES (UUID(), ?, ?, ?, ?)",
					[displayName, hashedpass, emailLower, admin || false],
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

// app.put('/api/user', jsonParser, function (req, res) {
// 	if (req.body.password) {
// 		var hashedpass = bcrypt.hashSync(req.body.password, salt);
// 		con.query("UPDATE QuornhubDb.users SET name = ?, password = ?, email = ?, admin = ? WHERE id = ?", [req.body.name, hashedpass, req.body.email, req.body.admin, req.body.id], function (err, result, fields) {
// 			if (err) throw err;
// 			res.send(result);
// 			console.log("update user works")
// 		});
// 	}
// });

// app.delete('/api/user', (req, res) => {
// 	  if (req.params.id) {
// 	con.query("DELETE FROM QuornhubDb.users WHERE id = ?", [req.params.id], function (err, result, fields) {
// 	  if (err) throw err;
// 	  res.send(result);
// 	  console.log("delete user works")
// 	});
//   }
// });

app.post("/login", jsonParser, function (request, response) {
	// Capture the input fields
	var email = request.body.emailAddress.toLowerCase();
	var password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified email and password
		con.query(
			"SELECT * FROM QuornhubDb.users WHERE email = ? ",
			[email],
			function (error, results, fields) {
				// If there is an issue with the query, output the error
				if (error) {
					return response.status(500).send({ error });
				}
				// If the account exists
				if (
					// Check if the query returned any users results
					results.length > 0 &&
					// Compares the password entered with the password stored in the database
					bcrypt.compareSync(password, results[0].password)
				) {
					// Authenticate the user
					// request.session.loggedin = true;
					// request.session.email = email;
					// Redirect to home page
					response.send({
						mame: results[0].name,
						admin: results[0].admin,
						emailAddress: results[0].email,
					});
				} else {
					response.status(401).send({ message: "Incorrect email or password" });
				}
				response.end();
			}
		);
	} else {
		response.send("Please enter Email and Password!");
		response.end();
	}
});

const filePath = path.join(__dirname, "/uploads");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdir(filePath, (err) => {
			cb(null, filePath);
		});
	},
	filename: function (req, file, cb) {
		const ext = file.mimetype.split("/")[1];
		cb(null, `${file.fieldname}_${Date.now()}.${ext}`);
	},
});

const upload = multer({ storage: storage });

app.post("/image", upload.single("image"), (req, res) => {
	try {
		const imageId = uuid.v4();

		if (req.file == undefined) {
			return res.status(400).send(`You must select a file.`);
		}
		const oldPath = req.file.path;
		const ext = req.file.mimetype.split("/")[1];
		const imageName = `${imageId}.${ext}`;
		const newPath = path.join(filePath, imageName);

		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err;
			res.send({ imageName });
			res.end();
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Error when trying upload images: ${error}`);
	}
});
