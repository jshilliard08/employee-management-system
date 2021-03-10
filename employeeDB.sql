
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT UNASSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL,
)

CREATE TABLE role (
---foriegn key references cascade
    id INT UNASSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNASSIGNED NOT NULL,
    salary DECIMAL NOT NULL, 
    dep_id (department_id), INT UNASSIGNED NOT NULL,
)

CREATE TABLE employee (
    id INT UNASSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL UNASSIGNED,
    INDEX role_id (role_id),
    ---foriegn key references cascade
    manager_id INT UNASSIGNED,
    INDEX man_id (manager_id)
    ---foriegn key references cascade
)
