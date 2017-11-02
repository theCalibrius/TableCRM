DROP DATABASE IF EXISTS table_crm;
CREATE DATABASE table_crm;
USE table_crm;

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Schema
* * * * * * * * * * * * * * * * * * * * * * * * * * */

DROP TABLE IF EXISTS leads;
CREATE TABLE leads (
  id int NOT NULL AUTO_INCREMENT,
  ownerId int,
  description varchar(255),
  firstName varchar(255),
  lastName varchar(255),
  suffix varchar(255),
  title varchar(255),
  value int,
  email varchar(255),
  phoneNumber varchar(255),
  createdDate datetime NOT NULL DEFAULT NOW(),
  updatedDate date,
  PRIMARY KEY (ID)
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Dummy Data
* * * * * * * * * * * * * * * * * * * * * * * * * * */

INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES ('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);
