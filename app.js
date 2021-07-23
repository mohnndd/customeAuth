const express = require("express");
const app = express();
var sql = require("mssql");
var user = require('./user');
var bodyParser = require('body-parser');
var db = require('./db');
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

app.get('/getProfile', verfeyToken, (req, res) => {




});

function verfeyToken (req, res) {

  const bearerHeader = req. headers['authorization'];
  
  
  if(typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ')
    const Token = bearer[1];
    

    db.executeSql("select [token],[expirytDate],[voided] from tokens where token = '"+Token+"'", async function (recordset, err) {

      if (err) { 
        console.log(err)
        res.send({status : "error"}).status(500);
      }
    
      var result = recordset.recordset[0]; 
      var foundToken = result.token;
      var expirytDate = result.expirytDate;
      var voided = result.voided;

      
      if (voided=0) {
        res.send({status : "token expired"}).status(400);
      }
      

    
    });

  }



};


app.get('/getAllpost', (req, res) => {});
app.get('/getpost', (req, res) => {});
app.post('/addpost', (req, res) => {});
app.post('/changepassword', (req, res) => {});

app.get("/", (req, res) => {

  res.send('hello world');

});


//start express server
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

