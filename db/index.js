const connection = require("./connection");
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  getAllEmployees() {
    return this.connection.Promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.name AS department, role.salary, concat(manager.first_name, ' ' , manager.last_name) AS manager FROM employee Left join role on employee.role_id = role.id Left join detartments on role.deparment_id = departments.id Left join employee manager on manager.id = employee.manager_id;"
      );
  }
  getAllDepartments() {
    return this.connection.Promise().query("SELECT departments.id, departments.name FROM departments;");
  }
  getAllRoles() {
    return this.connection.Promise().query("SELECT role.id, role.title, departments.name AS department, role.salary FROM role Left join departments on role.department_id = departments.id;");
  }
  AddEmployee(employee) {
    return this.connection.Promise().query("INSERT INTO employee SET ?", employee);
  }
  AddRole(role) {
    return this.connection.Promise().query("INSERT INTO role SET ?", role);
  }
  AddDepartment(department) {
    return this.connection.Promise().query("INSERT INTO departments SET ?", department);
  }
  UpdateEmployee(employeeId, roleId) {
    return this.connection.Promise().query("UPDATE employee SET role_id = ? where id = ?", [
        roleId,
        employeeId,
      ]);
  }
}
module.exports = new DB(connection);

