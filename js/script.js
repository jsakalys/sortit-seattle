// Load script on ready
$('document').ready(function() {

// Make an array containing different arrays of rubbish items by category

var rubbish = {
	"compostable" : ["banana peel", "eggshell", "tea bag", "flowers", "paper plate"],
	"recycling" : ["milk carton", "cereal box", "paper cup", "yogurt container", "aluminum can"],
	"garbage": ["aluminum foil", "plastic wrap", "foam carton", "rubber band", "plastic fork"],
}; // tip: to access banana peel, you need rubbish["compostable"][0]

// Make a function to create a random blue item with blue class
// if tutorial mode == true, set aura
var blueItem = function() {
$('#trash-chute').append('<div class="blue-item">' + rubbish["recycling"][Math.floor((Math.random()*rubbish["recycling"].length))] + '</div>');
};

// Make a function to create a green item with green class
// if tutorial mode == true, set aura
var greenItem = function() {
$('#trash-chute').append('<div class="green-item">' + rubbish["compostable"][Math.floor((Math.random()*rubbish["compostable"].length))] + '</div>');
};

// Make a function to create a gray item with gray class
// if tutorial mode == true, set aura
var grayItem = function() {
$('#trash-chute').append('<div class="gray-item">' + rubbish["garbage"][Math.floor((Math.random()*rubbish["garbage"].length))] + '</div>');
};

// Make a var to track items generated
var itemsGenerated = 0;

// Make a var to track items successfully sorted

var itemsSorted = 0;

// Make a var to keep track of current round

var currentRound = 0;

// Make a function to randomly generate items at a set interval with a 1 minute timeout
// At timeout, check for winner

var getRandomCategory = function() {
	return Math.floor((Math.random()*3));
};

var generateItem = function() {
	var randomCategory = getRandomCategory();

	if (randomCategory == 0) {
		console.log('Blue');
		return blueItem();
	} else if (randomCategory == 1) {
		console.log('Green');
		return greenItem();
	} else if (randomCategory == 2) {
		console.log('Gray');
		return grayItem();
	};
};

// Make items droppable and trash cans receivable

// Make items hide when dropped and increment items sorted

// Make function to play game

// Make function to restart game

// Make function to stop game

// Make function to enter tutorial mode

// Make play button, tutorial mode button, reset button, and stop button

// Function to check for winner 
// If win, popup win and show button to go to next round or stop, if Lose, popup lose and give option to replay or stop

// Function next round, increment item generation interval, increment round counter

}); // end document load function