const inquirer = require("inquirer");
const db = require("./db/index");
require("console.table");

function employeePrompt() {
  console.log("prompt");
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
        process.exit();
      }
    });
}
function viewDepartments() {
  db.getAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => employeePrompt());
}
function viewRoles() {
  db.getAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => employeePrompt());
}
function viewEmployees() {
  db.getAllEmployees()
    .then(([rows]) => {
      let employee = rows;
      console.table(employee);
    })
    .then(() => employeePrompt());
}
function addDepartment() {

  
}
function addRole() {
  db.getAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentchoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          message: " what the name of the role",
        },
        {
          name: "salary",
          message: " what is the salary",
        },
        {
          type: "list",
          name: "departmentid",
          message: " which department does the role belong to",
          choices: departmentchoices,
        },
      ])
      .then((role) => {
        db.AddRole(role);
      })
      .then(() => employeePrompt());
  });
}

function addEmployee() {}
function updateEmployee() {}

employeePrompt();
