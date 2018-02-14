const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'iltgroup3.cp6f73a0po5w.eu-central-1.rds.amazonaws.com',
  user: 'writeuser',
  password: 'writepassword',
  database: 'iltgroup3'
});

connection.connect();


// Register new user
app.post('/register', (req, res) => {
  
  var data = [
    [req.body.username, req.body.password]
  ];

  connection.query('INSERT INTO members (username, password) VALUES (?);', data, function(err, rows) {
    if (err) {
      console.log(err);
      return next('MySQL error, check query');
    }

    res.sendStatus(200);
  });

});

// Login user
app.post('/login', (req, res) => {
    
  var data = [
    [req.body.username, req.body.password]
  ];


  connection.query(
    'SELECT username, password FROM members WHERE username=\'' + 
    req.body.username + '\' AND password=\'' + 
    req.body.password + '\';', function(err, results) {

    if (err) {
      console.log(err);
      return next('MySQL error, check query');
    }

    if (results.length === 1) {
      res.send(200, results[0]);
    } else {
      res.sendStatus(400);
    }
  });

});

app.get('/getQuestions', (req, res) => {
  connection.query('SELECT * FROM questions;', function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  })
});

app.post('/getTeams', (req, res) => {
  connection.query('SELECT * FROM teams WHERE tid=' + (req.body.tid == undefined ? 'true' : req.body.tid) + ';', function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  })
});

app.post('/postAnswer', (req, res) => {

  console.log(req.body.answer);

  var data = [
    [req.body.answer, req.body.qid, req.body.tid]
  ];

  connection.query('INSERT INTO answers (a, qid, tid) VALUES (?) ;', data, function(err, rows) {
    if (err) {
      console.log(err);
      return next('MySQL error, check query');
    }

    res.sendStatus(200);
  });
});

app.listen(8081, () => console.log('Example app listening on port 8081!'))