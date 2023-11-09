Create TABLE QuornhubDb.users (
    id varchar(36) NOT NULL UNIQUE,
    name tinytext NOT NULL,
    email tinytext NOT NULL,
    password tinytext NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (id)
    );