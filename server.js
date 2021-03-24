const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");

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
        console.log("viewAllEmp");
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            console.table(res);
            emplyoyeeInput();
        });
        //.then((answer) => {
        //const query = 'SELECT position, song, year FROM top5000 WHERE ?';
        //connection.query(query, { artist: answer.artist }, (err, res) => {
        //res.forEach(({ position, song, year }) => {
        //console.log(
        //`Position: ${position} || Song: ${song} || Year: ${year}`
      }
    })

}

emplyoyeeInput()