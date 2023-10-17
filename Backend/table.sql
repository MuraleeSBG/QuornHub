Create TABLE QuornhubDb.recipes (
    id int NOT NULL,
    recipeName tinytext NOT NULL,
    recipeImg tinytext NOT NULL,
    recipeDesc tinytext NOT NULL,
	isVegan boolean NOT NULL,
    isGlutenFree boolean NOT NULL, 
    isNutFree boolean NOT NULL,
    isLactoseFree boolean NOT NULL,
    isUnder15 boolean NOT NULL,
    ingredients json NOT NULL,
    method mediumtext NOT NULL
    );

