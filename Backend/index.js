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
const session = require("express-session");
const cookieParser = require("cookie-parser");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(10);
const MySQLStore = require("express-mysql-session")(session);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.static(__dirname));
const sessionLength = 1000 * 60 * 60 * 24; // 1 day session length

// Set up the session store to save sessions
const sessionStore = new MySQLStore({
	host: "localhost",
	user: "root",
	password: "rootpass",
	database: "QuornhubDb",
});
app.use(
	session({
		secret: "ChangeMetoBeASecretKey",
		saveUninitialized: true,
		resave: false,
		store: sessionStore,
		cookie: { maxAge: sessionLength },
	})
);
app.use(cookieParser());

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "rootpass",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

// Endpoint to get all recipes - with a query parameter to filter by tag
app.get("/recipes", (req, res) => {
	const tag = req.query.tag;
	// If there is a tag, we need to add a where clause to the query
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

// Endpoint to get a single recipe by ID
app.get("/recipe/:id", (req, res) => {
	con.query(
		"SELECT * FROM QuornhubDb.recipes WHERE id = ? LIMIT 1",
		[req.params.id],
		function (err, result) {
			if (err) throw err;
			// we need to transform the result an array of objects and parse some of the fields
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
			// If the recipe doesn't exist, return a 404
			if (parsedResult.length === 0) {
				return res.status(404).send({
					message: "Recipe not found",
				});
			}
			res.send(parsedResult[0]);
		}
	);
});

//Endpoint to delete a recipe by id
app.delete("/recipe/:id", jsonParser, function (req, res) {
	// If the user isn't an admin don't allow them to delete the recipe, return Unauthorized response
	if (!req.session.admin) {
		return res.status(401).send("Only admins can delete recipes");
	}
	if (req.params.id) {
		con.query(
			"DELETE FROM QuornhubDb.recipes WHERE id = ?",
			[req.params.id],
			function (err, result, fields) {
				if (err) throw err;
				res.send(result);
				console.log(`Recipe ${req.params.id} deleted`);
			}
		);
	}
});

//Endpoint to create a new recipe
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
		// If any of the required fields are missing, return a 400 Bad Request response
		if (!recipeName || !recipeDesc || !ingredients || !method || !serves) {
			return res.status(400).send({
				message: "Recipe name, ingredients and method are required",
			});
		}

		// The request includes a list of tags, we need to transform this into a boolean for each databse field
		const isVegan = tags.includes("Vegan");
		const isGlutenFree = tags.includes("Gluten Free");
		const isNutFree = tags.includes("Nut Free");
		const isLactoseFree = tags.includes("Lactose Free");
		const isUnder15 = tags.includes("< 15 Minutes");

		// Generate a unique id for the recipe, because each recipe needs a unique id
		const recipeId = uuid.v4();
		// Insert the recipe into the database with a query
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

// Endpoint to update a recipe
app.put("/recipe/:recipeId", jsonParser, function (req, res) {
	//If the user isn't an admin don't allow them to edit the recipe, return Unauthorized response
	if (!req.session.admin) {
		return res.status(401).send("Only admins can edit recipes");
	}
	// The request includes a list of tags, transform this into a boolean for each database field
	const tags = req.body.tags;
	const isVegan = tags.includes("Vegan");
	const isGlutenFree = tags.includes("Gluten Free");
	const isNutFree = tags.includes("Nut Free");
	const isLactoseFree = tags.includes("Lactose Free");
	const isUnder15 = tags.includes("< 15 Minutes");
	if (req.params.recipeId) {
		// Update the recipe with the new values
		con.query(
			"UPDATE QuornhubDb.recipes SET recipeName = ?, recipeImg = ?, recipeDesc = ?, serves = ?, isVegan = ?, isGlutenFree = ?, isNutFree = ?, isLactoseFree = ?, isUnder15 = ?, ingredients = ?, method = ? WHERE id = ?",
			[
				req.body.recipeName,
				req.body.recipeImg,
				req.body.recipeDesc,
				req.body.serves,
				isVegan,
				isGlutenFree,
				isNutFree,
				isLactoseFree,
				isUnder15,
				JSON.stringify(req.body.ingredients),
				req.body.method,
				req.params.recipeId,
			],
			function (err) {
				if (err) throw err;
				res.send({ recipeId: req.params.recipeId });
			}
		);
	}
});

// Endpoint to get all users
app.get("/users", (req, res) => {
	con.query("SELECT * FROM QuornhubDb.users", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
		console.log("get user works");
	});
});

// Endpoint to create a user - used on the create an account screen
app.post("/user", jsonParser, async function (req, res) {
	const { emailAddress, password, displayName, admin } = req.body;
	// If any of the required fields are missing, return a 400 Bad Request response
	if (!emailAddress || !password || !displayName) {
		return res.status(400).send({
			message: "Email, name and password are required",
		});
	}
	try {
		var emailLower = emailAddress.toLowerCase();

		// Firstly query the users table to check if the email already exists
		con.query(
			"SELECT COUNT(*) AS count FROM QuornhubDb.users WHERE email = ?",
			[emailLower],
			function (err, result, _fields) {
				if (err) throw err;
				//If a user is found with the same email address, return a 400 Bad Request response as we don't want a duplicate email address
				if (result[0].count > 0) {
					return res.status(400).send({
						message: "Email already exists",
					});
				}

				// If the email doesn't exist, create the user with a hashed password
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

// Endpoint to login a user
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
			function (error, results) {
				// If there is an issue with the query, return the error
				if (error) {
					return response.status(500).send({ error });
				}
				// If the account exists and the password is correct, log the user in
				if (
					// Check if the query returned any users results
					results.length > 0 &&
					// Compares the password entered with the password stored in the database, if they match return true
					bcrypt.compareSync(password, results[0].password)
				) {
					//Set the user information on the session
					//this is stored in the backend and a cookie is sent back to the frontend, when the user makes a request,
					// the cookie is sent back to the backend and the session is retrieved so
					// that we can check whether the user is logged in and an admin for certain functions
					request.session.user = results[0].email;
					request.session.admin = results[0].admin === 1;
					request.session.save();
					// Send the user information back to the frontend so that the FE can display edit/delete buttons if the user is an admin
					response.send({
						name: results[0].name,
						admin: results[0].admin === 1,
						emailAddress: results[0].email,
					});
				} else {
					response.status(401).send({ message: "Incorrect email or password" });
				}
				response.end();
			}
		);
	} else {
		//If no email or password is entered, return a 400 Bad Request response
		response.status(400).send("Please enter Email and Password!");
		response.end();
	}
});

// Endpoint to logout a user
app.get("/logout", function (req, res) {
	// This destroys the backend reference of the session and clears the cookie from the browser
	// This means that the user will have to login again to access the admin functions
	req.session.destroy();
	res.send("logout success!");
});

// File path to store recipe images
const filePath = path.join(__dirname, "/uploads");

// Multer is middleware for handling uploading complicated form data, in this case image files
// This tells multer where to store the image and what to name it
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

//Endpoint to upload an image
// First Multer stores the file temporarily in the uploads folder
// deepcode ignore NoRateLimitingForExpensiveWebOperation: App is not deployed publicly so rate limiting is not required yet
app.post("/image", upload.single("image"), (req, res) => {
	try {
		// Generate a unique id for the image so that we can give it a unique name
		// and link it back to the recipe
		const imageId = uuid.v4();

		if (req.file == undefined) {
			return res.status(400).send(`You must select a file.`);
		}

		// Get the temporary filename Multer used and rename it to the unique id
		// keeping the same file extension
		const oldPath = req.file.path;
		const ext = req.file.mimetype.split("/")[1];
		const imageName = `${imageId}.${ext}`;
		const newPath = path.join(filePath, imageName);

		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err;
			// Send the image name back to the frontend so that we can set it on the recipe that is being created or edited
			res.send({ imageName });
			res.end();
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Error when trying upload images: ${error}`);
	}
});
