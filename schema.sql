DROP DATABASE IF EXISTS table_crm;
CREATE DATABASE table_crm;
USE table_crm;

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Schema
* * * * * * * * * * * * * * * * * * * * * * * * * * */

CREATE TABLE opportunities (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  description text(255),
  estimatedValue int,
  winProbability decimal(3,2),
  expectedCloseDate date,
  closeDate date,
  createdDate timestamp,
  updatedDate date,
  PRIMARY KEY (id)
);

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

INSERT INTO opportunities (name, description, estimatedValue, winProbability, expectedCloseDate) VALUES ('retail pricing app', 'Entrepreneur Rachel just got funding and is looking to add more features to her app.', 50000, 0.80, '2017-12-31');
INSERT INTO opportunities (name, description, estimatedValue, winProbability, expectedCloseDate) VALUES ('contractor work with Apple', 'Their design team is looking to outsource for a period of 2-3 months.', 60000, 0.50, '2017-11-15');
INSERT INTO opportunities (name, description, estimatedValue, winProbability, expectedCloseDate) VALUES ('recruitment app', 'Steve is looking for a technical cofounder. Prior experience with two startups that got sold.', 210000, 0.75, '2017-12-1');


