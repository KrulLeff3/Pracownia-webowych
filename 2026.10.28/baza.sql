CREATE DATABASE IF NOT EXISTS pracownia CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;

USE pracownia;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(100),
    nazwisko VARCHAR(100),
    email VARCHAR(255),
    tekst TEXT,
    data_dodania DATETIME DEFAULT CURRENT_TIMESTAMP
);
