// Since all four episode sites use this JS file, I had to make all functionality completely portable

let views = parseInt($("#view-count").html()); // Parse the counts from the DOM as integers
let likes = parseInt($("#like-count").html());
let shares = parseInt($("#share-count").html());

let metadataOpen = false;
let likePressed = false;
let sharePressed = false;
let subscribePressed = false;
let promptOpened = false;

let episode = $("#episode-number").html();

let viewMult = 0; // Using changing global variables rather than function parametres because recursion with a parameter function is very weird in JS
let likeMult = 0;
let shareMult = 0;
let freqMult = 0;

function randomIncrement() { // Increment the view/like/share count dynamically with a touch of randomness to simulate the different popularities of each episode
	$( "#views" ).html(function() {
		views = views + Math.floor(Math.random() * viewMult); // Math.random() returns a value between 0 and 1 - the lower the multiplier is, the higher the chance of it being rounded to 0, meaning no change in the count
		return views + " views";
	});
	$( "#likes" ).html(function() {
		likes = likes + Math.floor(Math.random() * likeMult);
		return likes + " likes";
	});
	$( "#shares" ).html(function() {
		shares = shares + Math.floor(Math.random() * shareMult);
		return shares + " shares";
	});
	setTimeout(randomIncrement, Math.random() * 1000 * freqMult); // Recursive function: calls itself again after a random timeout moderated by the frequency multiplier
}

$(document).ready(function() { // Check which episode we just opened and set parametres accordingly
	console.log("Checking episode number");
	if(episode.search("Episode 1") != -1) { // String.search() returns -1 if the substring wasn't found - so if it's NOT -1, that means we found it
		console.log("Episode 1");
		viewMult = 5;
		likeMult = 2;
		shareMult = 1;
		freqMult = 10;
		randomIncrement();
	}
	else if(episode.search("Episode 2") != -1) {
		console.log("Episode 2");
		viewMult = 10; // The later episodes have higher metrics to simulate their increasing popularity
		likeMult = 4;
		shareMult = 3;
		freqMult = 7; // Unlike the other three counts, a lower value here means smaller timeout values, aka faster recursion (and update)
		randomIncrement();
	}
	else if(episode.search("Episode 3") != -1) {
		console.log("Episode 3");
		viewMult = 20;
		likeMult = 7;
		shareMult = 4;
		freqMult = 5;
		randomIncrement();
	}
	else if(episode.search("Episode 4") != -1) {
		console.log("Episode 4");
		viewMult = 50; // The newest video is the most hyped
		likeMult = 10;
		shareMult = 7;
		freqMult = 3;
		randomIncrement();
	}

});

$(document).ready(function() {
	$("#video-file").on("play", function(e) {
		if(e.target.currentTime >= e.target.duration / 2) {
			if(promptOpened == true) {
				$(".subscribe-prompt").fadeOut(); // Hide the prompt when pressing play again
			}
		}
	});
});

$(document).ready(function() {
	$("#video-file").on("pause", function(e) {
		if(e.target.currentTime >= e.target.duration / 2) { // Ask for subscription if the viewer pauses more than halfway through
			if(promptOpened == false) {
				$(".subscribe-prompt").fadeIn();
				promptOpened = true; // Only show prompt once
			}
		}
	});
});

$(document).ready(function() {
	$("#like-button").click(function() { // Change icon and like counter upon liking/unliking video
		if(likePressed == false) {
			$("#like-button").css("content", 'url("like-pressed.png")');
			likes = likes + 1;
			$( "#likes" ).html(likes + " likes");

			likePressed = true;
		}
		else {
			$("#like-button").css("content", 'url("like.png")');
			likes = likes - 1;
			$( "#likes" ).html(likes + " likes");

			likePressed = false;
		}

	});
});

$(document).ready(function() { // Ditto for the share button
	$("#share-button").click(function() {
		if(sharePressed == false) {
			shares = shares + 1;
			$( "#shares" ).html(shares + " shares");

			sharePressed = true; // Can't unshare once you shared!
		}
	});
});

$(document).ready(function() { // And for the subscribe button
	$("#subscribe-button").click(function() {
		if(subscribePressed == false) {
			$("#subscribe-button").css("background-color", "black");
			$("#subscribe-button").css("color", "white");

			subscribePressed = true;
		}
		else {
			$("#subscribe-button").css("background-color", "white");
			$("#subscribe-button").css("color", "black");

			subscribePressed = false;
		}
	});
});
