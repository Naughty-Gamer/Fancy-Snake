const SQL = require("../DB/queries.js")
const bcrypt = require("bcrypt")
const saltRounds = 10

/** setTimeouts allows time for database querying */

/**
 * Check if the clients credintials are correct. Compare their hashed password inside the database with the input they entered.
 * @param {Object Literal} data the username and the password.
 * @param {Function} callback will execute on a succesful query
 */
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

/**
 * Check if the username entered by the user to register is taken by another user or not.
 * @param {Object Literal} data the username and the password.
 * @param {Function} callback will execute on a succesful query
 */
let isUsernameTaken = function (data, cb) {
	setTimeout(function () {
		SQL.getUser(data.username, cb)
	}, 100)
}

/**
 * Adding the hashed password and the username of the player when he registers.
 * @param {Object Literal} data the username and the password.
 * @param {Function} callback will execute on a succesful query
 */
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
