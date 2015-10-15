// Load script on ready
$('document').ready(function() {

//\\ First, set global variables //\\

// Make an array containing different arrays of rubbish items by category
var rubbish = {
	"compostable" : ["banana peels", "apple cores", "potato skins", "egg shells", "tea bags", "dried flowers", "paper plates", "old bread", "fish bones", "coffe grounds", "coffee filters", "pizza boxes", "soiled paper", "paper bags"],
	"recycling" : ["milk cartons", "cereal boxes", "paper cups", "yogurt containers", "aluminum cans", "food containers", "plastic bottles", "soup cartons", "cardboard boxes", "scrap paper", "glass bottles", "glass jars", "metal cans", "plastic cups", "colored plastics"],
	"garbage": ["soiled foil", "plastic wrap", "foam containers", "rubber bands", "plastic utensils", "produce baskets", "twist ties", "latex gloves", "plastic gloves", "candy wrappers", "food wrappers"],
};

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

// Declare variable for speed of item generation in milliseconds
var gameSpeed = 2000; // 2000 for hard, 4000 for easy

// Declare variable for speed of round in milliseconds
var roundSpeed = 30000; // 30 second game

// Declare variable to initialize progress bar incrementor
var progressValue = 0;


//\\ Next, set properties for DOM elements //\\

// Theme existing buttons
$('button').button();
$("#toggle-tutorial").button()

// Make option buttons into a button set
$('#gameplay-options').buttonset();

// Make bins droppable (can use hoverClass option for tutorial mode)
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
$( "#progress-bar" ).progressbar({
  max: roundSpeed,
  value: 0
});

//\\ And now for some functions //\\

// Function to update progress bar at each interval
var updateProgress = function() {
	progressValue += gameSpeed;
	$("#progress-bar").progressbar( "option", "value", progressValue );
};

// Make a function to create a random blue item with blue class
// If in tutorial mode, set hint color
var blueItem = function() {
	$('#trash-chute').append('<div class="blue-item"><p>' + rubbish["recycling"][Math.floor((Math.random()*rubbish["recycling"].length))] + '</p></div>');
	if (tutorialMode) {
	$('.blue-item').addClass('blue-item-tutorial');
	};
};

// Make a function to create a green item with green class
// If in tutorial mode, set hint color
var greenItem = function() {
	$('#trash-chute').append('<div class="green-item"><p>' + rubbish["compostable"][Math.floor((Math.random()*rubbish["compostable"].length))] + '</p></div>');
	if (tutorialMode) {
	$('.green-item').addClass('green-item-tutorial');
	};
};

// Make a function to create a gray item with gray class
// If in tutorial mode, set hint color
var grayItem = function() {
	$('#trash-chute').append('<div class="gray-item"><p>' + rubbish["garbage"][Math.floor((Math.random()*rubbish["garbage"].length))] + '</p></div>');
	if (tutorialMode) {
	$('.gray-item').addClass('gray-item-tutorial');
	};
};

// Make a function to make newly generated items draggable
var makeDraggable = function() {
	$( ".blue-item" ).draggable({
		containment: $('#main'),
		cursor: 'move',
		revert: 'invalid'
	});
	$( ".green-item" ).draggable({
		containment: $('#main'),
		cursor: 'move',
		revert: 'invalid'
	});
	$( ".gray-item" ).draggable({
		containment: $('#main'),
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
};

// Make function to toggle tutorial mode
var toggleTutorialMode = function() {
	if (tutorialMode) {
		tutorialMode = false;
		console.log("Tutorial mode is now set to OFF."); // alert user with popup?
	} else {
		tutorialMode = true;
		console.log("Tutorial mode is now set to ON."); // alert user with popup?
	};
};

<<<<<<< HEAD
=======
// Assign function to howto button
$('#howto-button').on("click", function(event) {
	event.preventDefault();
	swal("How to play", "Press the play button to start, and race the clock by sorting the rubbish items into their proper container. Be quick! If you don't sort everything properly before the garbage collector arrives you will fail. Press tutorial mode button to display helpful color-coded hints as to what rubbish belongs where.");
});

>>>>>>> master
// Assign function to tutorial mode toggle button
$('#toggle-tutorial').on("click", function(event) {
	event.preventDefault();
	toggleTutorialMode();
});

// Make function to play game (generate items at a set interval)
var playGame = function() {
	intervalID = setInterval(function() {
		generateItem();
		makeDraggable();
		updateProgress();
	}, gameSpeed);
};

// Assign function to play button
$('#play-button').on("click", function(event) {
	event.preventDefault();
	playGame();
	checkWinner();
});

// Make function to stop game and clear all fields
var stopGame = function() {
	clearInterval(intervalID);
	clearTimeout(timeoutID);
	$("#progress-bar").progressbar( "option", "value", 0);
	$('#trash-chute').html('');
	progressValue = 0;
	itemsGenerated = 0;
	itemsSorted = 0;
};

// Assign function to stop button
$('#stop-button').on("click", function(event) {
	event.preventDefault();
	stopGame();
});

// Make function to restart game
var restartGame = function() {
	stopGame();
	playGame();
	checkWinner();
};

// Assign function to restart button
$('#restart-button').on("click", function(event) {
	event.preventDefault();
	restartGame();
});

// Function to check for winner
// If win, popup win and show button to go to next round or stop
// if lose, popup lose and give option to replay or stop
var checkWinner = function() {
	timeoutID = setTimeout(function() {
		if (itemsGenerated == itemsSorted) {
			stopGame();
			swal({
				title: "Great job!",
				text: "The truck is here and all items have been sorted. Looks like you made it!",
				type: "success",
				confirmButtonText: "Cool"
			});
		} else {
			stopGame();
				swal({
				title: "Oh dear!",
				text: "The truck is here and there are still some items that need sorting! Maybe you should practice your sorting skills some more.",
				type: "error",
				confirmButtonText: "Alright"
			});
		}
	}, roundSpeed + 2000);
};

// Make next round function that increases difficulty level
// Or you can do an easy, medium, hard mode!

}); // end document load function