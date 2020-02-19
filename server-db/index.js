const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
let app = express();

var MongoClient = require('mongodb').MongoClient;
var pgp = require('pg-promise')();

var mdb = MongoClient.connect('mongodb://localhost:27017/sagerwilliams', function (err, client) {
  if (err) {
    throw err;
  }

  return mdb = client.db('sagerwilliams');

})
// var pdb = pgp('postgres://sagerwilliams:password@localhost:5432/sagerwilliams');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../client/public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());

let fixSearch = (str) => {
  str = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return str;
}

app.get('/api/searchItems', (req,res) => {
  console.time('dbQuery');
  let search = fixSearch(req.query.search);
  
  mdb.collection('products').find({"title":{$regex:`.*${search}.*`}}).limit(5).toArray(function (err, result) {
    if (err) {
      throw err;
    }

    console.timeEnd('dbQuery');
    res.send(result);
  });
})

// app.get('/api/searchItems', (req, res) => {
//   // console.time('dbGet');
//   let search = fixSearch(req.query.search);
//   pdb.any(`SELECT * FROM products WHERE title LIKE '%${search}%' LIMIT 5;`)
//     .then(function (data) {
//       // console.timeEnd('dbGet');
//       res.send(data);
//     })
//     .catch(function (error) {
//       console.log('ERROR:', error)
//       res.sendStatus(404);
//     })
// })

let port = 3030;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
