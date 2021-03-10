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