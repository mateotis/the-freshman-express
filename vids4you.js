let views = 1000;
let likes = 150;
let shares = 11;

function randomIncrement() {
	$( "#views" ).html(function() {
		views = views + Math.floor(Math.random() * 10);
		return views + " views";
	});
	$( "#likes" ).html(function() {
		likes = likes + Math.floor(Math.random() * 3);
		return likes + " likes";
	});
	$( "#shares" ).html(function() {
		shares = shares + Math.floor(Math.random() * 1);
		return shares + " shares";
	});
	setTimeout(randomIncrement, Math.random() * 10000)
}

$(document).ready(function() {
	randomIncrement();
});
