

INSERT INTO departments (name)
VALUES ('Tech'), ('Marketing'), ('Operational');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 500000, 3), ('Engineer', 75000, 2), ('Intern', 35000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ali', 'Safia', 3, null), ('Abdullahi', 'Maria', 2, 1), ('Mascud', 'Aaliyah', 1, 1);