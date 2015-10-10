// Load script on ready
//$('document').ready(function() {

// First, set global variables

// Make a var to track items generated

var itemsGenerated = 0;

// Make a var to track items successfully sorted

var itemsSorted = 0;

// Make a var to keep track of current round

var currentRound = 0;

// Make intervalID for current round

var intervalID = -1;

// Next, set properties for DOM elements

// Make bins droppable (use hoverClass option for tutorial mode)
// Additionally, make items hide when dropped and increment items sorted

$( "#blue-bin" ).droppable({
	accept: ".blue-item",
	drop: function(event, ui) {
		ui.draggable.remove();
		itemsSorted++;
	}
}); 

$( "#green-bin" ).droppable({
	accept: ".green-item",
	drop: function(event, ui) {
		ui.draggable.remove();
		itemsSorted++;
	}
});

$( "#gray-bin" ).droppable({
	accept: ".gray-item",
	drop: function(event, ui) {
		ui.draggable.remove();
		itemsSorted++;
	}
});

// Now, make an array containing different arrays of rubbish items by category

var rubbish = {
	"compostable" : ["banana peel", "eggshell", "tea bag", "flowers", "paper plate"],
	"recycling" : ["milk carton", "cereal box", "paper cup", "yogurt container", "aluminum can"],
	"garbage": ["aluminum foil", "plastic wrap", "foam carton", "rubber band", "plastic fork"],
}; // key: to access banana peel, you need rubbish["compostable"][0]

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

// Make function to make newly generated items draggable

var makeDraggable = function() {

	$( ".blue-item" ).draggable({
		containment: $('#game'),
		cursor: 'move',
		revert: 'invalid'
	});

	$( ".green-item" ).draggable({
		containment: $('#game'),
		cursor: 'move',
		revert: 'invalid'
	});

	$( ".gray-item" ).draggable({
		containment: $('#game'),
		cursor: 'move',
		revert: 'invalid'
	});

};

// Make a function that randomly generates a number from 0-3 to determine the array from which to draw

var getRandomCategory = function() {
	return Math.floor((Math.random()*3));
};

// Make a function to randomly generate items

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

		itemsGenerated++;

}; // end generateItem function



// Make function to play game (set interval for generateItem) at a set interval with a 1 minute timeout
// At timeout, check for winner
// Assign to play button

var playGame = function() {

	intervalID = setInterval(function() {
		generateItem();
		makeDraggable();
		// check winner
	}, 2000);
};

$('#play-button').on("click", function(event) {
	event.preventDefault();
	playGame();
});

// Make function to stop game and assign to stop button

var stopGame = function() {
	clearInterval(intervalID);
	$('#trash-chute').html('');
};

$('#stop-button').on("click", function(event) {
	event.preventDefault();
	stopGame();
});

// Make function to restart game and assign to reset button

var restartGame = function() {
	event.preventDefault();
	stopGame();
	playGame();
};

$('#restart-button').on("click", function(event) {
	event.preventDefault();
	restartGame();
});


// Make function to enter tutorial mode

// Function to check for winner 

// var checkWinner = function() {
// 	if (itemsSorted == itemsGenerated) {
// 		alert('You win!');
// 		stopGame();
// 	}
// }
// If win, popup win and show button to go to next round or stop, if Lose, popup lose and give option to replay or stop

// Function next round, increment item generation interval, increment round counter
// Or you can do an easy, medium, hard mode!

//}); // end document load function