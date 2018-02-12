const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
});

// connection.connect();

// Request mappings

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/goodbye', (req, res) => {
  res.send('Goodbye World!')
})

// TODO
app.get('db', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {

    } else {
      res.send(results);
    }
  })
})




app.listen(3000, () => console.log('Example app listening on port 3000!'))
