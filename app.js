const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'iltgroup3.cp6f73a0po5w.eu-central-1.rds.amazonaws.com',
  user: 'writeuser',
  password: 'writepassword',
  database: 'iltgroup3'
});

connection.connect();

app.use(express.static('static'));

// Request mappings

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/insert-test', (req, res) => {
  connection.query('INSERT INTO questions (q) VALUES ("This is a sample question?");',
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
})

app.get('/goodbye', (req, res) => {
  res.send('Goodbye World!')
})



app.listen(8081, () => console.log('Example app listening on port 3000!'))
