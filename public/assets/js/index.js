console.log('I DEMAND TO BE FED!');

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAM0GvDXtheKCoVeI5ZSAFUXMCshB8J6As",
	authDomain: "ftpcomputer-ce788.firebaseapp.com",
	databaseURL: "https://ftpcomputer-ce788.firebaseio.com",
	storageBucket: "ftpcomputer-ce788.appspot.com",
};
firebase.initializeApp(config);

// Other vars
var loadingId = 0;

// Sign in when the page loads
$(document).ready(function() {
	signIn();
});

// Button triggers file dialog
$("#food-button").click(function(e) {
	e.preventDefault();
	$("#food").trigger('click');
});

// File changed listener
function incomingFood(files) {
	console.log("incomingFood", files);
	if (files.length > 0) {
		var food = files[0];
		uploadFile(food);
	}
}

// Sign in anonymously
function signIn() {
	firebase.auth().signInAnonymously().catch(
		function(error) {
  			console.log('signIn', error);
		});
}

// Upload a file
function uploadFile(file) {
	console.log("uploadFile", file);

	var storageRef = firebase.storage().ref();
	var timeStamp = new Date().getTime();

	var uploadTask = storageRef
		.child(timeStamp + '-' + file.name)
		.put(file);

	startLoading();
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
		function(snapshot) {
			console.log('state_changed', snapshot);
		},
		function(error) {
			console.log('error', error);

			stopLoading();
			alert('BRING ME A MORE PLEASING FILE.');
		},
		function() {
			console.log('success');

			stopLoading();
			alert('I AM SATED.');
		});
}

function startLoading() {
	var btn = $('#food-button');
	btn.text('.');

    loadingId = setInterval(function () {
    	var txt = btn.text();
    	if (txt === '.') {
    		btn.text('..');
    	} else if (txt === '..') {
    		btn.text('...');
    	} else {
    		btn.text('.');
    	}
    }, 500);
}

function stopLoading() {
	clearInterval(loadingId);
	$('#food-button').text('FEED');
}