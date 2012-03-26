CREATE TABLE customers (
id CHAR(36) NOT NULL,
name VARCHAR(64) NOT NULL,
address VARCHAR(255) NOT NULL,
created datetime NOT NULL,
modified datetime NOT NULL,
PRIMARY KEY (id)
);