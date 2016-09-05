console.log("app.js sourced");

var piPieces = [];
var piece = 0;
var counter = 0;

$( document ).ready(function(){
  var searchURL = 'http://devjana.net/pi/pi_students.json';
  // ajax call
  $.ajax({
    url: searchURL,
    dataType: 'JSON',
    success: function(data){
      // console.log('ajax success data:', data);
      piPieces = data.students;
      console.log(piPieces);
      $('#resultsDiv').html("<p>" + piPieces[piece].first_name + " " + piPieces[piece].last_name + "<br>" + piPieces[piece].info);
      updateCurrent();
      wholePi();



    }
  });
});
var updateCurrent = function () {
  $('#currentPiece').html("<p>Showing " + (piece + 1) + "/18</p>");
  console.log('update piece =', piece);
};

var showPiece = function(current){
  piece = current;
  console.log('in showPiece');
  $('#resultsDiv').fadeOut('slow', function(){
    $('#resultsDiv').html("<p>" + piPieces[piece].first_name + " " + piPieces[piece].last_name + "<br>" + piPieces[piece].info);
    updateCurrent();
  });
  $('#resultsDiv').fadeIn(1000);
  counter = 0;
};

var wholePi = function () {
  for (var i = 0; i < piPieces.length; i++) {
    $('#buttons').append("<button onClick='showPiece(" + i + ")'>" + piPieces[i].first_name + " " + piPieces[i].last_name + "</button>");
  }
};

var nextPiece = function(){
  console.log('in nextPiece');
  if (piece == 16) {
    piece = 0;
    showPiece(piece);
  }else{
    piece ++;
    showPiece(piece);
  }
};

var prevPiece = function(){
  console.log('in prevPiece');
  if (piece == 0) {
    piece = 16;
    showPiece(piece);
  }else{
  piece --;
  showPiece(piece);
  }
};
// failed attempt to make buttons work with jquery wanted to come back and try later if time
// var previousButton = $('<button />').on('click', prevPiece()).html("Previous");
// var nextButton = $('<button />').on('click', nextPiece()).html("Next");
// $('#next').append(nextButton);
// $('#prev').append(previousButton);
