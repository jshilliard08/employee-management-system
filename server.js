const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //will need process.env
    user: 'root',
    password:'password',
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
            const viewAll = queryAllEmpl();
            break;
          case "View All Employees by Department":
            const allByDpt = queryAllEmplbyDpt();
            break;
          case "View All Employees by Manager":
            const allByMgr = viequeryAllEmplbyMgr();
            break;
          case "Add Employee":
            const addEmpl = queryAddEmpl();
            break;
          case "Remove Employee":
            const rmvEmply = queryRemoveEmpl();
            break;
          case "Update Employee Role":
            const updtEmplRole = queryUpdtEmplRole();
            break;
          case "Update Employee Manager":
            const updtEmplyMgr = queryUpdtEmplMgr();
        }
        const viewAll = () => {
            inquirer
              .prompt({
                name: 'employee',
                type: 'input',
              })
              //.then((answer) => {
                //const query = 'SELECT position, song, year FROM top5000 WHERE ?';
                //connection.query(query, { artist: answer.artist }, (err, res) => {
                  //res.forEach(({ position, song, year }) => {
                    //console.log(
                      //`Position: ${position} || Song: ${song} || Year: ${year}`
                    );
                  });
                });
              });
          };
      });
  }
  emplyoyeeInput()