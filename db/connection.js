const mysql = require("mysql");
const util = require("util");


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //will need process.env
    user: 'root',
    password:'password',
    database: 'employeedb',

});


connection.query = util.promisify(connection.query);

module.exports = connection;

