const express = require("express");
const app = express();
var sql = require("mssql");
var user = require('./user');
var bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/allusers', (req, res) => {

  user.getList(req, res);

});

app.post('/registration', (req, res) => {

  user.addUser(req, res);

});

app.post('/login', (req, res) => {

  user.loginUser(req, res);

});

app.get('/getAllpost', (req, res) => {});
app.get('/getpost', (req, res) => {});
app.post('/addpost', (req, res) => {});
app.get('/getProfile', (req, res) => {});
app.post('/changepassword', (req, res) => {});

app.get("/", (req, res) => {

  res.send('hello world');

});



app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

