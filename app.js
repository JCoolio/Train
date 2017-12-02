
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCvX1VYuddg2G8KCKbrY2tx_084ouT6cFo",
    authDomain: "train-9b598.firebaseapp.com",
    databaseURL: "https://train-9b598.firebaseio.com",
    projectId: "train-9b598",
    storageBucket: "",
    messagingSenderId: "1023072419632"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var TrainName = "";
  var destination = "";
  var firstTime = "";
  var freq = "";


$("#addTrain").on("click", function(event)
	{

     event.preventDefault();

      TrainName = $("#addTrainName").val().trim();
      destination = $("#addDestination").val().trim();
      startTime = moment($("#addTrainTime").val().trim(), "HH:mm").format("");
      freq = $("#addFrequency").val().trim();

      database.ref().push({
        TrainName: TrainName,
        destination: destination,
        startTime: startTime,
        freq: freq

      });

       TrainName = $("#addTrainName").val("");
      destination = $("#addDestination").val("");
      firstTime = $("#addTrainTime").val("");
      freq = $("#addFrequency").val("");

	});

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      var sv = snapshot.val();


      console.log(sv.TrainName);
      console.log(sv.destination);
      console.log(sv.startTime);
      console.log(sv.freq);

      var TimeConverted = moment(startTime, "HH:mm").subtract(1, "years");

      var diffTime = moment().diff(moment(TimeConverted), "minutes");

      var tRemainder = diffTime % freq;

      var MinTillTrain = freq - tRemainder;

      var nextTrain = moment().add(MinTillTrain, "minutes");
      var nextTrainConverted = moment(nextTrain).format("hh:mm a");



      $("#employeeTable").append(
        "<tr><td>" + sv.TrainName +
        "</td><td>" + sv.destination +
        "</td><td>" +  sv.freq +
        "</td><td>" +  nextTrainConverted +
        "</td><td>" + MinTillTrain +
        "</td></tr>");


    }, function(errorObject) {
      console.log("Errors Logged: " + errorObject.code);
    });
h
