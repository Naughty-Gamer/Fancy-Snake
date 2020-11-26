/**
 * This function prevents any malicous attacks from the users, if they tried to,
 * by only allowing a whitelisted format to go through to the most critical
 * components of the application
 * @param {Object Literal} data the username and password of the user.
 * @returns {Object Literal} the username and password after the validation process, as well as a reason if either of those were rejected
 */
function validate(data) {
	let reason = null

	if (!data.username.match(/^[A-Za-z0-9_]{1,18}$/)) {
		return {
			username: null,
			password: null,
			reason: "Please enter a username with only numbers and letters, with atleast 1 character and maximum 18",
		}
	} else if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{8,50}$/)) {
		return {
			username: null,
			password: null,
			reason:
				"Please enter a password that contains at least 1 special character, 1 uppercase character and 1 number.\nIt should be atleast 8 characters long and a maximum of 50",
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
