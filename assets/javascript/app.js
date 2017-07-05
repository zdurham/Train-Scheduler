
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyAD41EfetxXQnPE3_OXtEqiek4zvU8ucvQ",
  authDomain: "anton-e3e61.firebaseapp.com",
  databaseURL: "https://anton-e3e61.firebaseio.com",
  projectId: "anton-e3e61",
  storageBucket: "anton-e3e61.appspot.com",
  messagingSenderId: "1021309951045"
};

firebase.initializeApp(config);

var database = firebase.database();

// Create a function to create a new cell, as we will be doing this multiple times per row
function createTd(string, row) {
  var td = $("<td>")
  td.html(string)
  $(row).append(td);
}


// Create a function that creates a row and adds each cell to the row. This takes the object (getting this from the database) and the key (unique for each row from database object)
function buildRow(object, key) {

}
  

 
  // On click function that takes the data the user puts into the display fields
$("#submit").on("click", function(e) {
  // Prevent the default action
  e.preventDefault();

  // Create an object that will be pushed to Firebase
  var trainObj = {};
  // Declare the properties of the object to match inputs
  trainObj.name = $("#train-name").val().trim()
  trainObj.destination = $("#destination").val().trim()
  trainObj.firstTime = $("#first-time").val().trim()
  trainObj.frequency = $("#frequency").val().trim()

  // Console.log to test object
  console.log(trainObj)
  
  // Push the object to Firebase 
  database.ref().push(trainObj)
  // Clear the input fields of the form
  document.getElementById("add-train").reset();

  })