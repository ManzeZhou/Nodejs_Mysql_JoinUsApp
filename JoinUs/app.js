const express = require('express');
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

require('dotenv').config();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASSWORD,
    database : 'join_us'
});

app.get("/", function (req, res) {
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        console.log(results[0].count);
        let count = results[0].count;
        // Response with that count

        // res.send("We have"+ count +"users in our db");
        res.render("home", {data: count})
    });
});

app.post('/register', function(req,res){
    var person = {email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        console.log(err);
        console.log(result);
        res.redirect("/");
    });
});

app.listen(3000, function () {
    console.log('Server running on 8080!');
});