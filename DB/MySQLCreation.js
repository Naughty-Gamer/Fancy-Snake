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
function executeQuery(query, callback){
    pool.getConnection(function(err, connection){
        if(err){
            return callback(err, null);
        }
        else if (connection){
            connection.query(query, function(err, rows, fields){
                connection.release();
                if(err){
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        }
        else {
            return callback(true, "No Connection")
        }
    });
}

function Result(query, callback){
    executeQuery(query, function(err, rows){
        if(!err){
            callback(null, rows);
        }
        else{
            callback(true, err);
        }
    });
}


function findUser(user, callback){
    const selectUser =  (SQL 'SELECT * FROM snake_game.users WHERE username = ${user};'); 
    Result(selectUser, function(err, rows){
        if (!err){
            callback(null, rows);
        }
        else{
            console.log(err);
        }
    });
}

function userCreation(user, pwd, callback){
    const insert = (SQL 'INSERT INTO snake_game.users (user, pwd) VALUES (${user}, ${pwd});');
    Result(insert, function(err, result){
        if(!err){
            callback(null, result.affectedRows, result.insertUser)
        }
        else{
            console.log(err);
        }
    });
};

function ordering(wins, callback){
    const order = (SQL 'SELECT * FROM snake_game.leaderboard WHERE ${wins} ORDERBY DSC;');
    Result(order, function(err, rows){
        if(!err){
            callback(null, rows);
        }
        else{
            console.log(err);
        }
    });
};

module.exports = {
    findUser,
    userCreation,
    ordering
};