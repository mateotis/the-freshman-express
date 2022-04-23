let views = parseInt($("#view-count").html()); // Parse the counts from the DOM as integers
let likes = parseInt($("#like-count").html());
let shares = parseInt($("#share-count").html());

let metadataOpen = false;
let likePressed = false;
let sharePressed = false;

let episode = $(".title").html();

let viewMult = 0; // Using changing global variables rather than function parametres because recursion with a parameter function is very weird in JS
let likeMult = 0;
let shareMult = 0;
let freqMult = 0;

function randomIncrement() { // Increment the view/like/share count dynamically with a touch of randomness to simulate the different popularities of each episode
	console.log("Setting random timeout");
	$( "#views" ).html(function() {
		views = views + Math.floor(Math.random() * viewMult);
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
	setTimeout(randomIncrement, Math.random() * 1000 * freqMult);
}

$(document).ready(function() { // Check which episode we just opened and set parametres accordingly
	console.log("Checking episode number");
	if(episode.search("Episode 1") != -1) {
		console.log("Episode 1");
		//randomIncrement(5, 2, 1, 10);
		viewMult = 5;
		likeMult = 2;
		shareMult = 1;
		freqMult = 10;
		randomIncrement();
	}
	else if(episode.search("Episode 2") != -1) {
		console.log("Episode 2");
		viewMult = 10;
		likeMult = 4;
		shareMult = 3;
		freqMult = 7;
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
		randomIncrement(50, 10, 7, 3);
		viewMult = 50;
		likeMult = 10;
		shareMult = 7;
		freqMult = 3;
		randomIncrement();
	}

});

$(document).ready(function() {
	$(".metadata").click(function() {
		if(metadataOpen == false) {
			$(".metadata-details").show();
			metadataOpen = true;
		}
		else {
			$(".metadata-details").hide();
			metadataOpen = false;
		}

	});
});

$(document).ready(function() {
	$("#like-button").click(function() { // Change icon and like counter upon liking/unliking video
		console.log("Clicked like");
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

$(document).ready(function() {
	$("#share-button").click(function() {
		if(sharePressed == false) {
			shares = shares + 1;
			$( "#shares" ).html(shares + " shares");

			sharePressed = true; // Can't unshare once you shared!
		}
	});
});
