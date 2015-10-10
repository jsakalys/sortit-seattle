// Load script on ready
//$('document').ready(function() {

// First, set global variables

// Make a var to track items generated

var itemsGenerated = 0;

// Make a var to track items successfully sorted

var itemsSorted = 0;

// Make a var to keep track of current round

var currentRound = 0;

// Make intervalID generating trash

var intervalID = -1;

// Make timeoutID for one round

var timeoutID = -1;


// Set var to toggle tutorial mode

var tutorialMode = false;


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

// initialize progress bar
$( "#progress-value" ).progressbar({
  max: 10000,
  value: 0
});

// var to initialize progress bar value incrementor
var progressValue = 0;

// function to update progress bar

var updateProgress = function() {
	progressValue += gameSpeed;
	$("#progress-value").progressbar( "option", "value", progressValue );
};

// Gameplay functions

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
			itemsGenerated++;
			console.log('Blue item generated.');
			console.log('Total items generated: ' + itemsGenerated);
			return blueItem();
		} else if (randomCategory == 1) {
			itemsGenerated++;
			console.log('Green item generated.');
			console.log('Total items generated: ' + itemsGenerated);
			return greenItem();
		} else if (randomCategory == 2) {
			itemsGenerated++;
			console.log('Gray item generated.');
			console.log('Total items generated: ' + itemsGenerated);
			return grayItem();
		};


}; // end generateItem function

// declare variable for speed of generation in milliseconds

var gameSpeed = 2000; // 2000 for hard, 3000 for easy, 1000 for extreme

// Make function to play game (set interval for generateItem) at a set interval with a 1 minute timeout
// At timeout, check for winner
// Assign to play button

var playGame = function() {

	intervalID = setInterval(function() {
		generateItem();
		makeDraggable();
		updateProgress();
	}, gameSpeed);
};

$('#play-button').on("click", function(event) {
	event.preventDefault();
	playGame();
	checkWinner();
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


// Make function to toggle tutorial mode and assign to tutorial mode button

var toggleTutorialMode = function() {
	if (tutorialMode) {
		tutorialMode = false;
		console.log("Tutorial mode is now set to OFF."); // alert user with popup
	} else {
		tutorialMode = true;
		console.log("Tutorial mode is now set to ON."); // alert user with popup
	};
};

$('#tutorial-mode').on("click", function(event) {
	event.preventDefault();
	toggleTutorialMode();
});

// Function to check for winner
// If win, popup win and show button to go to next round or stop
// if lose, popup lose and give option to replay or stop

var checkWinner = function() {
	var timeoutID = setTimeout(function() {
		if (itemsGenerated == itemsSorted) {
		stopGame();
		alert('Time\'s up! Looks like you made it!');
		} else {
		stopGame();
		alert('Oh no! You didn\'t make it in time!');
		}
	}, 11000);
};


// Function next round, increment item generation interval, increment round counter
// Or you can do an easy, medium, hard mode!

//}); // end document load function