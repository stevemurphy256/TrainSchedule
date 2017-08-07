$(document).ready(function(){
//firebase=========================================================
var config = {
    apiKey: "AIzaSyC2W-MLDAOaEqs2_mUEOBL6R7sJK7x67Kg",
    authDomain: "train-schedule-eacc7.firebaseapp.com",
    databaseURL: "https://train-schedule-eacc7.firebaseio.com",
    projectId: "train-schedule-eacc7",
    storageBucket: "train-schedule-eacc7.appspot.com",
    messagingSenderId: "1050368851215"
  };
firebase.initializeApp(config);
//variables and button click=======================================
$("#submit").on("click", function() {
// Prevent the page from refreshing
      event.preventDefault();
//values for variables in html=====================================
	var name = $("#nameInput").val().trim();
	var name = $("#destInput").val().trim();
	var name = $("#timeInput").val().trim();
	var name = $("#freqInput").val().trim();

//push values to firebase==========================================
	database.ref().push().({
		name: name,
		dest: dest,
		time: time,
		freq: freq,
		timeAdded: firebase.database.ServerValue.TIMESTAMP
	});
  });

//child functions for on click=====================================
database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var time = childSnapshot.val().time;
	var freq = childSnapshot.val().freq;

	console.log("Name: " + name);
	console.log("Destination: " + dest);
	console.log("Time: " + time);
	console.log("Frequency: " + freq);
})



})