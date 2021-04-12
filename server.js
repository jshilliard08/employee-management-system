const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  //will need process.env
  user: "root",
  password: "password",
  database: "employeedb",
});

function employeeInput() {
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
    })
  ;}
      function viewAll() {
        console.log("View All Employees");
        connection.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;
          console.table("All Employees:", res);
          employeeInput();
        })
      };
      function allByDpt() {
        console.log("View All Departments");
        connection.query("SELECT * FROM department", function (err, res) {
          if (err) throw err;
          console.table("All Departments:", res);
          employeeInput();
        })
      };
      function allByRole() {
        console.log("View All Roles");
        connection.query("SELECT * FROM role",  function (err, res) {
            if (err) throw err;
            console.table(res);
            employeeInput();
          })
      };
      function addEmply() {
        console.log("Add Employee");
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          console.log(res);
          var allRole = res;
          var roleChoices = allRole.map((role) => role.title);
          console.log(roleChoices);

          inquirer
            .prompt([
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
                choices: roleChoices,
              },

              {
                type: "input",
                name: "employeeManagerId",
                message: "What is the employee's manager id?",
              },
            ])
            .then((answer) => {
              console.log(answer);
              let employeeObject = {};

              if ((answer.employeeManagerId = "")) {
                employeeObject = {
                  first_name: answer.employeeName,
                  last_name: answer.employeeLastName,
                  role_id: answer.employeeRoleId,
                };
              } else {
                employeeObject = {
                  first_name: answer.employeeName,
                  last_name: answer.employeeLastName,
                  role_id: answer.employeeRoleId,
                  manager_id: answer.employeeManagerId,
                };
              }
              connection.query(
                "INSERT INTO employee SET ?",
                employeeObject,
                function (err) {
                  if (err) throw err;
                  console.table(answer);
                  employeeInput();
                }
              );
            });
        });
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
              "INSERT INTO department SET ?",
              {
                name: answer.addDepartment,
              },
              (err, res) => {
                console.table(answer);
                if (err) throw err;
                employeeInput();
              }
            );
          });
      }
      function addRole() {
        inquirer
          .prompt(
            {
              name: "addDpt",
              type: "list",
              message: "What department is the role in?",
              choices: dptChoices,
            },
            {
              name: "addTitle",
              type: "input",
              question: "What is the name of the title",
            },
            {
              name: "addSalary",
              type: "input",
              question: "What is the salary for the new role",
            }
          )
          .then((answer) => {
            connection.query(
              "ALTER TABLE Role ADD column_name VARCHAR(30), title VACHAR(30), salary INT",
              {
                department_id: answer.addDpt,
                title: answer.addTitle,
                salary: answer.addSalary,
              },
              (err, res) => {
                console.table(answer);
                if (err) throw err;
                employeeInput();
              }
            );
          });
      }
      function updtEmplyRole() {
        inquirer
          .prompt([
            {
              name: "newTitle",
              type: "input",
              message: "What is the title of the new role?",
            },
            {
              name: "newSalary",
              type: "input",
              message: "What is the salary of the new role?",
            },
            {
              name: "depId",
              type: "input",
              message: "What is the department id of the new role?",
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.newTitle,
                salary: answer.newSalary,
                department_id: answer.depId,
              },
              (err, res) => {
                if (err) throw err;
                console.table(answer);
                employeeInput();
              }
            );
          });
      }

employeeInput();
