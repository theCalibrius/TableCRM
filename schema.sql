-- sudo chown -R _mysql:_mysql /usr/local/var/mysql
-- sudo mysql.server start
-- mysql -u root -p
-- mysql -u root table_crm < schema.sql
-- \. schema.sql
-- mysql -u root < schema.sql
DROP DATABASE table_crm;

CREATE DATABASE table_crm;
SET SQL_MODE="";
USE table_crm;

DROP TABLE IF EXISTS `leads`;

CREATE TABLE `leads` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `ownerId` INTEGER NOT NULL,
  `description` VARCHAR(255),
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `suffix` VARCHAR(255),
  `title` VARCHAR(255),
  `value` INTEGER,
  `email` VARCHAR(255),
  `phoneNumber` VARCHAR(255),
  `createdDate` DATETIME NOT NULL DEFAULT NOW(),
  `updatedDate` DATE ,
  CONSTRAINT `pk_Leads` PRIMARY KEY (
    `id`
  )
)

-- INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 5623381621, 1);
