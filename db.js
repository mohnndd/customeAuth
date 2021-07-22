var sqlDb = require('mssql');

const config = {
    user: "sa",
    password: "P@ssw0rd",
    server: "Mongler",
    trustServerCertificate: true,
    database: "Demo",
  };

exports.executeSql = function (sql, callback) {

    sqlDb.connect(config, function (err) {
    
        if (err) console.log(err);

        var request = new sqlDb.Request();
           
        request.query(sql, function (err, recordset) {
            
            if (err) {
                console.log(err)
                callback(err);
            }
            else {
                callback(recordset);
            }
            
        });
    });

};