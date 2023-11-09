Create TABLE QuornhubDb.recipes (
    id varchar(36) NOT NULL,
    recipeName tinytext NOT NULL,
    recipeImg tinytext,
    recipeDesc tinytext NOT NULL,
    serves int NOT NULL DEFAULT 1,
	isVegan boolean NOT NULL,
    isGlutenFree boolean NOT NULL, 
    isNutFree boolean NOT NULL,
    isLactoseFree boolean NOT NULL,
    isUnder15 boolean NOT NULL,
    ingredients json NOT NULL,
    method mediumtext NOT NULL,
    PRIMARY KEY(id)
    );

