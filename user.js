var db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const date = require('date-and-time');
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var token = '';

exports.getList = function(req, res) {
    db.executeSql('SELECT [firstName],[LastName],[email] FROM [Demo].[dbo].[users]', function (recordset, err) {
        if (err) {
            res.status(500);
        }
        else {
            res.send(recordset.recordset);
        }
        res.end();
    });

};

exports.addUser = async function (req, res) {

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

     db.executeSql("insert into users (firstName, lastName, email, password) values ('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.email+"','"+hashedPassword+"')", function (err){
        
         if (err) res.status(500);

         res.status(200).send({'status' : "sucessfull"}).end();

     });

};


exports.loginUser = async function (req, res) {

    db.executeSql("SELECT * FROM [Demo].[dbo].[users] where email = '"+req.body.email+"'", async function (recordset, err) {
        if (err) {
            res.status(500);
        }
        else {
            
            
            var password = recordset.recordset[0].password
            
            const validPassword = await bcrypt.compare(req.body.password, password);

            if (validPassword) {

                token ='';
                for (var i =0; i < 256; i++) {
                    token += characters.charAt(Math.random()*characters.length);
                }

               
                const now = new Date();
                now = date.addHours(now, 1);
                date.format(now, 'YYYY/MM/DD HH:mm:ss');
           

                db.executeSql("insert into tokens (email, token, expirytDate, voided) values ('"+req.body.email+"','"+token+"','"+now+"', 1)" , function (err) {
                    if (err) {
                        res.status(500);
                        console.log(err)
                    }
                });

                res.status(200).send({'status' : "sucessfull", "token" : token, "tokenExpiry" : now});
            }
            else {
                res.status(400).send({'status' : "faild"});
            }

        }
        res.end();
    });

};
 