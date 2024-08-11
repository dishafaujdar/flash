CREATE DATABASE mydb;

USE mydb;

CREATE TABLE flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO flashcards (id,question,answer)
VALUES
(1,'why','why not');
