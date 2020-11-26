// Reads the Config Vars from a Heroku runtime environment for connecting to a MySQL instance
module.exports = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
}
