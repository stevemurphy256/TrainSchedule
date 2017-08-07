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
var database = firebase.database();

$("#submit").on("click", function() {
// Prevent the page from refreshing
      event.preventDefault();
//values for variables in html=====================================
	var name = $("#nameInput").val().trim();
	var dest = $("#destInput").val().trim();
	var time = $("#timeInput").val().trim();
	var freq = $("#freqInput").val().trim();

//push values to firebase==========================================
	database.ref().push({
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

//convert train time=============================================
	var freq = parseInt(freq);
    //current time
    var currentTime = moment().format('HH:mm');
    var currentDate = moment().format("MMM Do YYYY");
    console.log("current time: " + moment().format('HH:mm'));
    //first time back 1 year to ensure positive value
    var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years')
    console.log("Date converted: " + dConverted);
    var trainTime = moment(dConverted).format('HH:mm');
    console.log("Train Time: " + trainTime);

    //difference between the times subtract 1 year to ensure positive value
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    console.log("Time diffreence: " + tDifference);
    //modulus for the remainder
    var tRemainder = tDifference & freq;
    console.log("Time remaining: " + tRemainder);
    //calculate minutes until next train
    var minsAway = freq - tRemainder;
    console.log("Minutes until next train " + minsAway);
    //next train time
    var nextTrain = moment().add(minsAway, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format('HH:mm'));

//append table and current time in HTML
$('#currentDate').text(currentDate);
$('#currentTime').text(currentTime);
$('#trainTable').append(
    "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
    "<td id='destDisplay'>" + childSnapshot.val().dest +
    "<td id='freqDisplay'>" + childSnapshot.val().freq +
    "<td id='nextDisplay'>" + moment(nextTrain).format('HH:mm') +
    "<td id='awayDisplay'>" + minsAway + " Minutes until next train" + "</td></tr>");

},

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

});