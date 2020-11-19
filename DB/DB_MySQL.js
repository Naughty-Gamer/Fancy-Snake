/*
var SQL = require('sql-template-strings');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit = 100,
    host: "localhost",
    user: "root",
    password: "root1",
    database: "snake_game",
    debug: true
});
*/
const createDb = function() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root1"
    });

    connection.connect(function(err){
        if (err) throw err;
    
        const mysqlDB = "create database if not exists 'snake_game';";
        connection.query(mysqlDB, function(err, result){
            if (err) throw err;
            console.log('Database has been created')
        });
        //to change database
        connection.changeUser({database: 'snake_game'}, function (err) {
            if(err){
                console.log('Database change error', err);
                return;
            }
        });
        const mysqlUser = "create table if not exists 'snake_game'.'users'("+
            "'username' varchar(20) NOT NULL,"+
            "'password' varchar(15) NOT NULL,"+ 
            "PRIMARY KEY ('username')"+
            ");";
        connection.query(mysqlUser, function(err, result){
            if (err) throw err;
            console.log(" Users table creation successful");
        });

        const mysqlLeaderboard = "create table if not exists 'snake_game'.'leaderboard'("+
            "'Standing' int(5) NOT NULL,"+
            "'username' varchar(20) NOT NULL,"+
            "'wins' int(5),"+
            "FOREIGN KEY ('username') REFERENCES 'snake_game'.'users'('username')"+
            ");";
        connection.query(mysqlUser, function(err, result){
            if (err) throw err;
            console.log(" Users table creation successful");
        });
    });
};

module.exports = createDb;