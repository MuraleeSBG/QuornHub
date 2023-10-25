Create TABLE QuornhubDb.users (
    id int NOT NULL UNIQUE,
    name tinytext NOT NULL,
    email tinytext NOT NULL,
    password tinytext NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (id)
    );