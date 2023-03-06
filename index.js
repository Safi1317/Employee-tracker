const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

function employeePrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "addEmployeePrompt",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add employee",
          "update an employee",
          "done",
        ],
      },
    ])
    .then(function (choices) {
      console.log(choices);
      if (choices.addEmployeePrompt == "view all departments") {
        return viewDepartments();
      } else if (choices.addEmployeePrompt == "view all roles") {
        return viewRoles();
      } else if (choices.addEmployeePrompt == "view all employees") {
        return viewEmployees();
      } else if (choices.addEmployeePrompt == "add a department") {
        return addDepartment();
      } else if (choices.addEmployeePrompt == "add a role") {
        return addRole();
      } else if (choices.addEmployeePrompt == "add employee") {
        return addEmployee();
      } else if (choices.addEmployeePrompt == "update an employee") {
        return updateEmployee();
      } else {
        console.log("done");
      }
    });
}
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      throw err;
    }
    console.table(results);
    employeePrompt();
  });
}
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      throw err;
    }
    console.table(results);
    employeePrompt();
  });
}
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      throw err;
    }
    console.table(results);
    employeePrompt();
  });
}
function addDepartment() {}
function addRole() {}
function addEmployee() {}
function updateEmployee() {}
