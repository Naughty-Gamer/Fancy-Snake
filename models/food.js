/**
 * FoodGreen class
 * Food that is green has a value of 1
 */
class FoodGreen {
	constructor(location) {
		// takes argument [x,y]
		this.foodValue = 1
		this.foodLocation = location
	}
	getFoodValue() {
		// returns Int
		return this.foodValue
	}
	getFoodLocation() {
		// returns array of food location [x,y]
		return this.foodLocation
	}
	setFoodLocation(location) {
		// takes array of food location [x,y]
		this.foodLocation = location
	}
}

/**
 * AllFood class
 * Holds state and behaviour of food items in the game
 */
class AllFood {
	constructor(x, y, percentage) {
		this.mapXMax = x
		this.mapYMax = y
		this.allFood = [] // array to hold all food items
		this.amountOfFood = Math.floor(((x * y) / 100) * percentage) // amount of food = percentage of map area
		this.addFood(x, y, this.amountOfFood) // adds all food to array imediately in constructor
	}

	getAllFood() {
		// returns array of food items
		return this.allFood
	}
	getAmountOfFood() {
		// returns # of food items made
		return this.amountOfFood
	}

	/**
	 * adds amountOfFood number of food items to allFood array
	 * @param {*} x size of map in x axis
	 * @param {*} y size of map in y axis
	 * @param {*} amountOfFood number of food items to add into allFood array
	 */
	addFood(x, y, amountOfFood) {
		for (var n = 0; n < amountOfFood; n++) {
			// Run code below, to make amountOfFood number of food items succesfully
			let newFoodLocation = this.createRandomLocation(x, y)
			let newFoodItem = new FoodGreen(newFoodLocation)
			this.allFood.push(newFoodItem)
		}
	}

	createRandomLocation(x, y) {
		let looping = null
		let newFoodLocation = null
		do {
			// create a new location for a new food item randomly within range of map size
			// if this location is already occupied by another food item, then try again
			looping = false
			newFoodLocation = [Math.floor(Math.random() * x) + 1, Math.floor(Math.random() * y) + 1]
			for (var i = 0; i < this.allFood.length; i++) {
				// for each food item in the array of all food
				if (this.allFood[i].getFoodLocation == newFoodLocation) {
					// if current food item location is same as new location, then looping = true (try again)
					looping = true
				}
			}
		} while (looping == true)
		return newFoodLocation
	}

	respawn(x, y) {
		for (var n = 0; n < this.amountOfFood; n++) {
			if (x == this.allFood[n].getFoodLocation()[0]) {
				if (y == this.allFood[n].getFoodLocation()[1]) {
					this.allFood[n].setFoodLocation(this.createRandomLocation(this.mapXMax, this.mapYMax))
				}
			}
		}
	}
}

module.exports = AllFood
