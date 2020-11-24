const SQL = require("../DB/queries.js")
const bcrypt = require("bcrypt")
const saltRounds = 10
/** setTimeouts allows time for database querying */

let isValidLoginAttempt = function (data, cb) {
	setTimeout(function () {
		SQL.getHashedPasswordByUser(data.username, function (hashedPassword) {
			if (hashedPassword.length > 0) {
				bcrypt.compare(data.password, hashedPassword[0].password, cb)
			} else {
				cb(false)
			}
		})
	}, 100)
}

let isUsernameTaken = function (data, cb) {
	setTimeout(function () {
		SQL.getUser(data.username, cb)
	}, 100)
}

// Now we can store the password hash in db.
let addUser = function (data, cb) {
	setTimeout(function () {
		bcrypt.hash(data.password, saltRounds, (err, hashedPass) => {
			SQL.createUser(data.username, hashedPass, cb)
		})
	}, 100)
}

module.exports.isValidLoginAttempt = isValidLoginAttempt
module.exports.isUsernameTaken = isUsernameTaken
module.exports.addUser = addUser
