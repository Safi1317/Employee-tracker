DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
   id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);
CREATE TABLE role (
 id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(30),
    salary INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
-- CREATE TABLE Manager (
--  id INT PRIMARY KEY AUTO_INCREMENT, 
--     manager_id INT,
--     FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );

