const { faker } = require('@faker-js/faker');
require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASSWORD,
    database : 'join_us'
});

const q = 'SELECT CURTIME() as time, CURDATE() as date, NOW() as now';

connection.query(q, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();

// console.log(faker.internet.email());