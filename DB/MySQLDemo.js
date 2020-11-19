const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1",
    database: "snake_game"
});

const findUser = function(user) {
    const selectSession = "SELECT * from snake_game.users where username = ?";
    con.connect(function(err) {
        if (err) throw err;
        con.query(selectSession, [user], function(err, result) {
            if (err) throw err;
            console.log("Selected: " + result);
            return result;
        });
    });
};

const createUser = function(){
    const insert = "INSERT INTO snake_game.users VALUES();";
    con.connect(function(err) {
        if (err) throw err;
        //create session with default values ID, and startDate
        con.query(insert, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            return result.affectedRows;
        });
    });
};

const ordering = function(wins){
    const order = "SELECT * FROM snake_game.leaderboard WHERE wins ORDERBY DSC;";
    con.connect(function(err){
        if (err) throw err;
        con.query(order, function(err, result){
            if (err) throw err;
            console.log("Selected: " + result);
            return result;
        });
    });
};

module.exports = {
    findUser,
    createUser,
    ordering
};