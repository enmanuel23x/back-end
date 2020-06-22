DROP IF EXISTS `MAPEO`;
CREATE DATABASE IF NOT EXISTS `MAPEO`;
USE `MAPEO`;

-- Registro de las conexiones
CREATE TABLE IF NOT EXISTS `connection_logs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(50) NOT NULL,
      `first_conn` datetime NOT NULL,
    `last_conn` datetime NOT NULL,
    PRIMARY KEY (`id`)
);
-- Grupos de usuario
CREATE TABLE IF NOT EXISTS `user_group` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `description` varchar(250) NOT NULL,
    PRIMARY KEY (`id`)
);
-- Categoria de skill
CREATE TABLE IF NOT EXISTS `categories` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `group_ids` JSON DEFAULT NULL,
    `description` varchar(250) NOT NULL,
    PRIMARY KEY (`id`)
);
-- Usuario
CREATE TABLE IF NOT EXISTS `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `group_id` int(11) DEFAULT NULL,
    `skills` JSON DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`group_id`) REFERENCES `user_group` (`id`)
);
CREATE TABLE IF NOT EXISTS `skills` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `category_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
);