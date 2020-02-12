const express = require('express');
const bodyparser = require('body-parser');
// const db = require('Database/index.js');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../client/public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : process.env.DB_PASS,
  database : 'searchbar'
});

connection.connect();

let port = 3030;

app.get('/api/searchItems', (req,res) => {
  connection.query('SELECT * FROM search', function (error, results) {
      if (error) {
        console.log('Error: ', error);
        res.status(404).send(error)
      };
      res.status(200).send(results);
    });
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
