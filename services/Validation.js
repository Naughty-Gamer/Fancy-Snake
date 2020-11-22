const SQL = require("../DB/queries.js")

/** setTimeouts allows time for database querying */

let isValidLoginAttempt = function (data, cb) {
	setTimeout(function () {
		SQL.getPassword(data.username, data.password, cb)
	}, 10)
}

let isUsernameTaken = function (data, cb) {
	setTimeout(function () {
		SQL.findUser(data.username, cb)
	}, 10)
}

let addUser = function (data, cb) {
	setTimeout(function () {
		SQL.userCreation(data.username, data.password, cb)
	}, 10)
}

module.exports.isValidLoginAttempt = isValidLoginAttempt
module.exports.isUsernameTaken = isUsernameTaken
module.exports.addUser = addUser
