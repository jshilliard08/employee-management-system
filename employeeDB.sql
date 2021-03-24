DROP DATABASE IF EXISTS employeedb;
CREATE DATABASE employeedb;
USE employeedb;
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL              
);
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	department_id INT UNSIGNED NOT NULL,
    Index dep_id (department_id),
    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL
);
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    Index role_id (role_id), 
    manager_id INT UNSIGNED,
    Index man_id (manager_id)
)
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales-Person", 50000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 90000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 100000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 150000, 4);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Joe", "Smoe", 2, NULL);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Jane", "Doe", 4, NULL);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Smith", 1, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Julia", "Roberts", 3, 1);



SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;