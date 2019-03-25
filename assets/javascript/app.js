$(document).ready(function () {
  
    var config = {
        apiKey: "AIzaSyA1BhwB9_8gHzB9Q-vCnwUnuZV8XqVa3mg",
        authDomain: "this-train-page.firebaseapp.com",
        databaseURL: "https://this-train-page.firebaseio.com",
        projectId: "this-train-page",
        storageBucket: "this-train-page.appspot.com",
        messagingSenderId: "834919745321"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      $("#submit-button").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

       
        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }  
       
        database.ref().push(newTrain);

        console.log(newTrain.name)

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");

      });

      database.ref().on("child_added", function(snapshot) {

          trainName = snapshot.val().name;
          destination = snapshot.val().destination;
          frequency = snapshot.val().frequency;
          firstTrainTime = snapshot.val().firstTrainTime;
          firstTrainMoment = moment(firstTrainTime, "HH:mm");
          var nextArrivalMinutes = moment().diff(firstTrainMoment, "minutes");
          var minutesAway = frequency - (nextArrivalMinutes % frequency);
          var nextArrivalObj = moment().add(minutesAway, "minutes");
          var nextArrival = nextArrivalObj.format("LT")
          
         

          var newRow = $("<tr>");

          var trainNameText = $("<td>").text(trainName);
          newRow.append(trainNameText);
          var destinationText = $("<td>").text(destination);
         newRow.append(destinationText);
          var frequencyText = $("<td>").text(frequency);
         newRow.append(frequencyText);
          var nextArrivalText = $("<td>").text(nextArrival);
          newRow.append(nextArrivalText);
        var minutesAwayText = $("<td>").text(minutesAway);
          newRow.append(minutesAwayText);

          $("tbody").append(newRow);
         


       
      });
});