
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
  // Create row variable
  var row = $("<tr class='train-row'>").attr("id", key)
  // Call createTD to create and append <td> with object information
  createTd(object.name, row)
  createTd(object.destination, row)
  createTd(object.frequency, row)

  // Time stuff goes here:
  var start = moment(object.firstTime, "HH:mm")// This is the starting time of the train -> the user's input
  console.log(start)

  var now = moment(); // This is the current time
  console.log(now)

  var diff = now.diff(start, "minutes") // This is the difference between now and the start time
  console.log(diff)

  if (diff > 0) {
    var increment;
    do {
      increment = start.add(object.frequency, "m")
    } while (now.diff(increment, "minutes") > 0)
    start = increment;
    diff = now.diff(start, "minutes")
  }

  createTd(start.format("HH:mm"), row)
  createTd(start.fromNow(), row)

  //Add delete button
  createTd('<i class="material-icons small del">delete</i>', row)

  //Add this row to the table body
  $("tbody").append(row)
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
  trainObj.firstTime = $("#hours").val().trim().concat(":", $("#minutes").val().trim());
  trainObj.frequency = $("#frequency").val().trim()

  // Test to see if anything is empty, or doesn't meet the proper parameters
  if (trainObj.name === "" || trainObj.destination === "" || trainObj.firstTime === "" || trainObj.freqency === "") {
    alert("Please complete all fields before submitting.")
    return
  }

  if ($("#hours").val() > 23 || $("#hours").val() < 0) {
    alert("That is not a valid input for hours. Please enter an hour between 00 and 23.")
    return
  }

  if ($("#minutes").val() > 59 || $("#minutes").val() < 0) {
    alert("That is not a valid input for minutes. Please enter minutes between 00 and 59.")
    return
  }


  // Console.log to test object
  console.log(trainObj)
  
  // Push the object to Firebase 
  database.ref().push(trainObj)
  // Clear the input fields of the form
  document.getElementById("add-train").reset();

})


// This function will sync the firebase data to the DOM, displaying it on the train schedule table
database.ref().on("child_added", function(data) {
  buildRow(data.val(), data.key); 
})

// This series of functions is for deleting train schedules by clicking the trashcan icon. This deletes directly from firebase
$(document).on("click", ".del", function(e) {
  var toBeDeleted = $(this).parents("tr");
  database.ref(toBeDeleted.attr("id")).remove()
})

// This function removes the information from the page after the data has been deleted from Firebase
database.ref().on("child_removed", function(data) {
  // This will specifically remove the particular row that the trashcan was clicked on. It targets the row by its unique id.
  $("#" + data.key).remove();

})