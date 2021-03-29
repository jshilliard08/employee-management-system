const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");
function allByDpt() {
  console.log("View All by Dept")
  connection.query("SELECT * FROM department",
  function(err, res){
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
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
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
        case "View All Employees by Manager":
          allByMgr();
          break;
        case "Add Employee":
          addEmply();
          break;
        case "Remove Employee":
          rmvEmply();
          break;
        case "Update Employee Role":
          updtEmplRole();
          break;
        case "Update Employee Manager":
          updtEmplyMgr();
      }
      function viewAll() {
        console.log("viewAllEmp")
          connection.query("SELECT * FROM employee", 
          function(err, res) {
            if (err) throw err
            console.table(res)
            emplyoyeeInput();
        });

      }
      function allByDpt() {
        console.log("View All by Dept")
        connection.query("SELECT * FROM department",
        function(err, res){
          if (err) throw err
          console.table(res)
          emplyoyeeInput();
        })
      }
      // function allByMgr(){
      //   console.log("All by Manager")
      //   connection.query("SELECT * FROM employee WHERE ")
     // }
     function addEmply(){
       console.log("Add Employee")
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
           type: "input",
           name: "employeeRoleId",
           message: "What is this employee's role?",
         },

         {
         type: "input",
         name: "employeeManagerId",
         message: "What is the employee's manager id?",
         }
       ])
       .then((answer) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employeeName,
            last_name: answer.employeeLastName,
            roles_id: answer.employeeRoleId,
            manager_id: answer.employeeManagerId,
          },
          function (err) {
            if (err) throw err;
            console.table(answer);
            emplyoyeeInput();
          });
        });
      } 
    })

}

emplyoyeeInput()