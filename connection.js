const mysql = require("mysql");
const { builtinModules } = require("node:module");
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //will need process.env
    user: 'root',
    password:'password',
    database: 'employeedb',

});

connection.connect();

connection.query = util.promisify(connection.query);

modules.exports = connection;

