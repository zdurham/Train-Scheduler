$(document).ready(function () {
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

  // Declare user inputs as variables
  

  var submit = $("#submit")
  // On click function that takes the data the user puts into the display fields
  submit.on("click", function() {
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    // Calculate the Next Arrival and Minutes Away
    

    console.log(trainName)
    console.log(destination)
    console.log(firstTime)
    console.log(frequency)
    
    // Store the values in the database
    database.ref().set({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    })

    
    
    


    // Clear the input fields
    $("#train-name").val('')
    $("#destination").val('')
    $("#first-time").val('')
    $("#frequency").val('')

  })
  
  
})