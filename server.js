const inquirer = require("inquirer");

const db = require('./db/connection');
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
  db.query(
    'SELECT * FROM departments',  
    function(err, results) {
        if (err){
            throw err;
        }
        console.table(results);
        employeePrompt();
    }
);
}
function viewRoles() {
  db.query(
    'SELECT * FROM role',  
    function(err, results) {
        if (err){
            throw err;
        }
        console.table(results);
        employeePrompt();
    }
);
}
function viewEmployees() {
  db.query(
    'SELECT * FROM employee',  
    function(err, results) {
        if (err){
            throw err;
        }
        console.table(results);
        employeePrompt();

    }
);
}
function addDepartment() {
  inquirer
  .prompt([
 
  {
      type: 'input',
      name: 'name',
      message: 'What is the department name?',
  },
  ])
  .then((answers) => {
 
  console.log(answers);
      db.query('INSERT INTO departments SET ?', {name: answers.name},
      function(err, results) {
          if (err){
              throw err;
          }
          console.table(results);
         employeePrompt();

      }
  );
  });
  
}
function addRole() {
  db.query(
    'SELECT name, id FROM departments',
    function(err, department){
        if (err){
            throw err;
        }
        let departmentchoices = department.map((departments) => {
            return{
                name: departments.name,
                value: departments.id
            }
        })
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
      name: "department_id",
      message: " which department does the role belong to",
      choices: departmentchoices,
    },
  ])
.then((answers) => {

console.log(answers);
    db.query('INSERT INTO role SET ?', {
        title: answers.title,
        salary: answers.salary, 
        department_id: parseInt(answers.department_id),
    },
    function(err, results) {
        if (err){
            throw err;}
      
        console.table(results);
        employeePrompt();

    }
);
})
})
}

function addEmployee() {
  inquirer
    .prompt([

    {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?',
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?',
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What is the role?',
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is the employees managers id?',
    },
    ])
    .then((answers) => {
   
        db.query('INSERT INTO employee SET ?', {
            first_name: answers.first_name,
            last_name: answers.last_name, 
            role_id: answers.role_id,
            manager_id: answers.manager_id
        },
        function(err, results) {
            if (err){
                throw err;}
            
            console.table(results);
           employeePrompt();


        }
    );
    })
}
function updateEmployee() {
  db.query(
    'SELECT id, first_name, last_name FROM employee',
    function(err, results) {
        if (err){
            throw err;
        }
        let employeechoices = results.map((employees)=>{
            return {
                name: employees.first_name,
                value: employees.id
            }
        })
        console.log(employeechoices)

        db.query(
            'SELECT id, title FROM role',
            function(err, role) {
                if (err){
                    throw err;
                }
        let rolechoices = role.map((roles) => {
            return {
                name: roles.title,
                value: roles.id
            }
        })

        inquirer.prompt([
            {
                type: 'list',
                name: 'who',
                message: 'which employee would you like to update?',
                choices: employeechoices
            },
            {
                type: 'list',
                name: 'role',
                message: 'What role would you like to give this employee?',
                choices: rolechoices
            }
        ]).then((answers) => {
            console.log(answers);
           db.query( 
                `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.who}`,
                function(err, results) {
                    if (err){
                        throw err;}
                    
                    console.table(results);
                    console.log('Successfully updated')
                    employeePrompt();
                }
                )
        })
    });
}
)
}

employeePrompt();
