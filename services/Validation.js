function validate(data) {
	let reason = null
	let username = data.username.match(/^[A-Za-z0-9_]{1,18}$/)
	let password = data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{8,50}$/)
	// console.log(username)
	// console.log(password)
	if (!username) {
		return {
			username: null,
			password: null,
			reason: 'Please enter a username with only numbers and letters, with atleast 1 character and maximum 18',
		}
	} else if (!password) {
		return {
			username: null,
			password: null,
			reason:
				'Please enter a password that contains at least 1 special character, 1 uppercase character and 1 number.\nIt should be atleast 8 characters long and a maximum of 50',
		}
	}

	// code will reach here if both the username and password are valid
	return {
		username: data.username,
		password: data.password,
		reason: reason,
	}
}

module.exports = { validate }
