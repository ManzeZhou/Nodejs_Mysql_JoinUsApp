const { faker } = require('@faker-js/faker');
require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASSWORD,
    database : 'join_us'
});

let data = [];
for(let i = 0; i < 500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
            ]);
}

const q = 'INSERT INTO users (email, created_at) VALUES ?'

connection.query(q, [data], function (error, result) {
    if (error) throw error;
    console.log(result);
});

connection.end();

// console.log(faker.internet.email());