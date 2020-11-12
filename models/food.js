// Green food has value 1
// just 1 for now
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

// class to hold array of all our foods on the map
// takes X and Y for size of map
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

	// adds amountOfFood number of food items (ONLY GREEN FOR NOW) to allFood array
	// takes argument x and y for size of map
	// takes argument amountOfFood for number of food items to add into allFood array
	addFood(x, y, amountOfFood) {
		for (var n = 0; n < amountOfFood; n++) {
			// Run code below, to make amountOfFood number of food items succesfully
			// only making Green Food for now ---------------------------------------!!!
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
			newFoodLocation = [
				Math.floor(Math.random() * x) + 1,
				Math.floor(Math.random() * y) + 1,
			]
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
					this.allFood[n].setFoodLocation(
						this.createRandomLocation(this.mapXMax, this.mapYMax)
					)
					//this.allFood[n].setFoodLocation(this.createRandomLocation(3,3))
				}
			}
		}
	}
	// Math.floor(Math.random() * 10);     // returns a random integer from 0 to 9
	//            0 (included) to 10 (excluded)
}

/*
TESTING, not to be used
let mapXSize = 50;
let mapYSize = 50;
50*50 = 2500, if % == 5, then 5% of 2500 = 125
let myFood = new MakeAllFood(mapXSize, mapYSize);

if (myFood.getAmountOfFood == 125) {
    sucess
    it sucessfully calculated the amount of food should be 5% of map area
}

if (myFood.allFood.length == 125) {
    success
    it sucessfully added the number of food items to cover 5% of map area
}

for (var i = 0; i < myFood.getAmountOfFood; i++) { // for all food items
    get location of all food items
    myFood.allFood[i].getFoodLocation();
}
*/

module.exports = AllFood
