console.log("app.js sourced");
// global variables declared
// store objects in array to loop through
var piPieces = [];
// var piece to keep # of current object in array
var piece = 0;
// var counter to keep track of time between pieces
var counter = 0;

$( document ).ready(function(){
  var searchURL = 'http://devjana.net/pi/pi_students.json';
  // ajax call
  $.ajax({
    url: searchURL,
    dataType: 'JSON',
    success: function(data){
      // check to make sure we have data stored
      piPieces = data.students;
      console.log(piPieces);
      // display on to dom
      $('#resultsDiv').html("<p>" + piPieces[piece].first_name + " " + piPieces[piece].last_name + "<br>" + piPieces[piece].info);
      // display which student or piece we are displaying
      updateCurrent();
      // appends all the buttons to the DOM for students
      wholePi();



    }
  });
});
var updateCurrent = function () {
  $('#currentPiece').html("<p>Showing " + (piece + 1) + " of 18</p>");
  console.log('update piece =', piece);
};

var wholePi = function () {
  // appends whole array as buttons on the dom
  for (var i = 0; i < piPieces.length; i++) {
    $('#buttons').append("<button onClick='showPiece(" + i + ")' class='btn btn-info btn-xs'>" + piPieces[i].first_name + " " + piPieces[i].last_name + "</button>");
  }
};

var showPiece = function(current){
  // function that fades in and fades out when display changes
  piece = current;
  console.log('in showPiece');
  $('#resultsDiv').fadeOut('slow', function(){
    $('#resultsDiv').html("<p>" + piPieces[piece].first_name + " " + piPieces[piece].last_name + "<br>" + piPieces[piece].info);
    updateCurrent();
  });
  $('#resultsDiv').fadeIn('slow');
  // resets counter timer to ensure always takes 10 seconds after a new one is displayed
  counter = 0;
};


var nextPiece = function(){
  // function to move the display to the next student in the list or if at the end go back to index 0
  console.log('in nextPiece');
  if (piece == 17) {
    piece = 0;
    showPiece(piece);
  }else{
    piece ++;
    showPiece(piece);
  }
};

var prevPiece = function(){
  //function to go to the previous student, or go to the end of the list.
  console.log('in prevPiece');
  if (piece == 0) {
    piece = 17;
    showPiece(piece);
  }else{
  piece --;
  showPiece(piece);
  }
};

var anotherPiece = setInterval(function(){
  // interval function to count to 10 before calling the nextPiece function to move to the next index in the array.
  counter ++;
  console.log(counter);
  if (counter == 10){
    counter = 0;
    nextPiece();
  }
}, 1000);


// failed attempt to make buttons work with jquery wanted to come back and try later if time
// var previousButton = $('<button />').on('click', prevPiece()).html("Previous");
// var nextButton = $('<button />').on('click', nextPiece()).html("Next");
// $('#next').append(nextButton);
// $('#prev').append(previousButton);
