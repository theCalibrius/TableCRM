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
  winProbability int,
  expectedCloseDate date,
  closeDate date,
  createdAt timestamp DEFAULT NOW(),
  updatedAt timestamp DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE contacts (
  contactId int NOT NULL AUTO_INCREMENT,
  firstName varchar(50),
  lastName varchar(50),
  suffix varchar(20),
  title varchar(50),
  department varchar(255),
  description varchar(255),
  email varchar(255),
  workPhoneNumber varchar(25),
  personalPhoneNumber varchar(25),
  createdDate timestamp,
  updatedDate date,
  PRIMARY KEY (contactId)
  /*,accountId int,*/
  /*FOREIGN KEY (accountId) REFERENCES opportunities (contactPersonId)*/
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
  PRIMARY KEY (id)
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Dummy Data
* * * * * * * * * * * * * * * * * * * * * * * * * * */

INSERT INTO leads (description, firstName, lastName, suffix, title, value, email, phoneNumber, ownerId) VALUES
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1),
('description', 'firstName', 'lastName', 'suffix', 'title', 10000000, 'hi@masato.io', 0001112222, 1);

INSERT INTO opportunities (name, description, estimatedValue, winProbability, expectedCloseDate) VALUES
('retail pricing app', 'Entrepreneur Rachel just got funding and is looking to add more features to her app.', 50000, 80, '2017-12-31'),
('contractor work with Apple', 'Their design team is looking to outsource for a period of 2-3 months.', 60000, 50, '2017-11-15'),
('recruitment app', 'Steve is looking for a technical cofounder. Prior experience with two startups that got sold.', 210000, 75, '2017-12-1'),
('IT support', 'Connection at MIT; not so exicting, but will wait to hear more update from Allen.', 210000, 30, '2017-12-1'),
('contractor work with Google', 'Started conversation with Debby. Pending response from Jessica.', 200000, 30, '2017-12-9'),
('teaching assistance application', 'software engineering role', 15000, 30, '2017-11-30');

INSERT INTO contacts (firstName, lastName, suffix, title, department, description, email, workPhoneNumber, personalPhoneNumber, createdDate) VALUES
('John','Jones','Mr.','Sales Manager','Sales','text1','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 02:18:22'),
('Sarah','Jones','Mrs.','Sales Coordinator','Sales','text2','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 04:20:22'),
('Larry','David','Mr.','Sales Manager','Sales','text3','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 04:18:22'),
('Sam','Johnson','Miss','Account Executive','Sales','text4','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 04:18:23'),
('Adam','Wills','Mr.','Vice President','Sales','text5','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 08:18:22'),
('Janet','Stone','Mrs.','CEO','Sales','text6','yasaman109@gmail.com','4082041351','4082041351','2017-11-04 05:18:22');
