const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");
function allByDpt() {
  console.log("View All by Dept")
  connection.query("SELECT * FROM department",
    function (err, res) {
      if (err) throw err
      console.table(res)
      emplyoyeeInput();
    })
}

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  //will need process.env
  user: 'root',
  password: 'password',
  database: 'employeedb',

});
function emplyoyeeInput() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewChoice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.viewChoice) {
        case "View All Employees":
          viewAll();
          break;
        case "View All Employees by Department":
          allByDpt();
          break;
        case "View All Employees by Role":
          allByRole();
          break;
        case "Add Employee":
          addEmply();
          break;
        case "Add Department":
          addDpt();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updtEmplyRole();
      }
      function viewAll() {
        console.log("viewAllEmp")
        connection.query("SELECT * FROM employee",
          function (err, res) {
            if (err) throw err
            console.table(res)
            emplyoyeeInput();
          });

      }
      function allByDpt() {
        console.log("View All by Dept")
        connection.query("SELECT * FROM department",
          function (err, res) {
            if (err) throw err
            console.table(res)
            emplyoyeeInput();
          })
      }
      function allByRole(){
        console.log("All by Role")
        connection.query("SELECT *, role_id FROM employeedb.employee JOIN role ON employee.role_id = role.id",
        function (err, res) {
          if (err) throw err
          console.table(res)
          emplyoyeeInput();
        })
     }
      function addEmply() {
        console.log("Add Employee")
        connection.query("SELECT * FROM role",
          function (err, res) {
            if (err) throw (err)
            console.log(res)
            var allRole = res
            var roleChoices = allRole.map((role) => role.title)
            console.log(roleChoices)

            inquirer.prompt([
              {
                type: "input",
                name: "employeeName",
                message: "What is the employee's first name?",
              },

              {
                type: "input",
                name: "employeeLastName",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "employeeRoleId",
                message: "What is this employee's role?",
                choices: roleChoices
              },

              {
                type: "input",
                name: "employeeManagerId",
                message: "What is the employee's manager id?",
              }
            ])
              .then((answer) => {
                console.log(answer)
                let employeeObject = {}

                if (answer.employeeManagerId = "") {
                  employeeObject = {
                    first_name: answer.employeeName,
                    last_name: answer.employeeLastName,
                    role_id: answer.employeeRoleId,
                  }
                } else {
                  employeeObject = {
                    first_name: answer.employeeName,
                    last_name: answer.employeeLastName,
                    role_id: answer.employeeRoleId,
                    manager_id: answer.employeeManagerId,
                  }
                }
                connection.query(
                  "INSERT INTO employee SET ?",
                  employeeObject,
                  function (err) {
                    if (err) throw err;
                    console.table(answer);
                    emplyoyeeInput();
                  });
              });
          })
      }
      function addDpt() {
        inquirer
          .prompt({
            name: "addDepartment",
            type: "input",
            message: "What is the name of the new Department?",
          })
          .then((answer) => {
            connection.query(
              "ALTER TABLE department ADD column_name VARCHAR(30)",
              answer.addDepartment,
              (err, res) => {
                console.table(answer);
                if (err) throw err;
                emplyoyeeInput();
              }
            );
          });
      };
      function addRole() {
        inquirer
          .prompt({
            name: "addRole",
            type: "input",
            message: "What is the name of the new Department?",
          })
          .then((answer) => {
            connection.query(
              "ALTER TABLE Role ADD column_name VARCHAR(30)",
              answer.addRole,
              (err, res) => {
                console.table(answer);
                if (err) throw err;
                emplyoyeeInput();
              }
            );
          });
      };
    })

}

emplyoyeeInput()