var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
   
   var mysqlHost = process.env.MYSQL_HOST || 'localhost';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'root';
   var mysqlPass = process.env.MYSQL_PASS || 'root';
   var mysqlDB   = process.env.MYSQL_DB   || 'counterDB';

   var connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass
   };
   var connection = mysql.createConnection(connectionOptions);
	
	
   connection.connect();
   connection.query("CREATE DATABASE IF NOT EXISTS 'counterDB';", function (error, results, fields) {
     if (error) throw error;
   });
   connection.end();
   
   
   
   connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass,
     database: mysqlDB
   };
   
   connection = mysql.createConnection(connectionOptions);

   

   connection.connect();
   connection.query("CREATE TABLE IF NOT EXISTS 'counterTABLE'('counter' int(11) NOT NULL auto_increment);", function (error, results, fields) {
     if (error) throw error;
   });
   
   connection.query("SELECT * FROM counterTABLE ORDER BY 'counter' DESC LIMIT 1;", function (error, results, fields) {
     if (error) throw error;
     responseStr = fields[0].counter;

     if(responseStr.length == 0)
        responseStr = '0';
     res.status(200).send(responseStr);
     
   });
   
   connection.query("insert into counterTABLE values();", function (error, results, fields) {
     if (error) throw error;
   });

   connection.end();
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});