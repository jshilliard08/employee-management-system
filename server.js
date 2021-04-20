const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection")
const ctable = require("console.table")

var deptArr = [];
var roleArr = [];
var managerArr = [];

connection.connect();

employeeInput();

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
        case "View All Departments":
          allByDpt();
          break;
        case "View All Roles":
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
        case "Exit":
          connection.end();
          break;
      }
    });
}
const viewAll = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeInput();
  });
};

const allByDpt = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeInput();
  });
};

const allByRole = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeInput();
  });
};

const addEmply = () => {
  console.log("Add Employee")
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats the employee's managers name?",
        choices: selectManager(),
      },
    ])
    .then((val) => {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO employee SET ? ",
        {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: managerId,
          role_id: roleId,
        },
        (err) => {
          if (err) throw err;
          employeeInput();
        }
      );
    });
};
const addDpt = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then((res) => {
      let query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        (err) => {
          if (err) throw err;
          employeeInput();
        }
      );
    });
};
const addRole = () => {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary, role.department_id AS Department FROM role JOIN department ON role.department_id = department.id",
    (err, res) => {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the role's Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
          {
            name: "department",
            type: "rawlist",
            message: "What is the role's department?",
            choices: selectDept(),
          },
        ])
        .then((res) => {
          connection.query(
            "INSERT INTO role SET ? ",
            {
              title: res.Title,
              salary: res.Salary,
              department_id: res.department
            },
            (err) => {
              if (err) throw err;
              employeeInput();
            }
          );
        });
    }
  );
};


const updtEmplyRole = () => {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            message: "What is the Employee's last name? ",
            choices: () => {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            }
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole(),
          },
        ])
        .then((val) => {
          var roleId = selectRole().indexOf(val.role) + 1;
          connection.query(
            "UPDATE employee SET WHERE ? ",
            {
              last_name: val.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              employeeInput();
            }
          );
        });
    }
  );
};

const selectDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      deptArr.push({ "name": res[i].name, "value": res[i].id });
    }
  });
  return deptArr;
};

const selectRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
};

const selectManager = () => {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name);
      }
    }
  );
  return managerArr;
};

