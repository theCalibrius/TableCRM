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
  `email` INTEGER,
  `phoneNumber` INTEGER,
  `createdDate` DATETIME NOT NULL DEFAULT NOW(),
  `updatedDate` DATE ,
  CONSTRAINT `pk_Leads` PRIMARY KEY (
    `leadId`
  )
)

INSERT INTO leads (firstName, lastName, OwnerId) VALUES ('Masato', 'Miura', 1);
INSERT INTO leads (firstName, lastName, OwnerId) VALUES ('Masato', 'Miura', 1);
INSERT INTO leads (firstName, lastName, OwnerId) VALUES ('Masato', 'Miura', 1);
INSERT INTO leads (firstName, lastName, OwnerId) VALUES ('Masato', 'Miura', 1);
INSERT INTO leads (firstName, lastName, OwnerId) VALUES ('Masato', 'Miura', 1);
