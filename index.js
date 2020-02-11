var express = require('express');
var app = express();
var path = require('path');
var port = 3030;
const bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');
const baseURL = 'NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/';

//database
var connection = mysql.createConnection({
  host     : 'database-1.cqdyyjncctls.us-east-1.rds.amazonaws.com',
  user     : 'root',
  password : 'turnpassword',
  database : 'searchbar'
});

connection.connect();

//middleware
app.use(cors())
app.use(express.static(path.join(__dirname, './dist')))
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/searchItems', (req,res) => {
    connection.query('SELECT * FROM search', function (error, results) {
        if (error) {
          console.log('nooooooooooooooooooooooooooooooo')
          res.status(404).send(error)
        };
        res.status(200).send(results);
      });
})

app.listen(port,  () => console.log('port ' + port + ' is on'))