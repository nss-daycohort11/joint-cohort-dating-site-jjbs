define(["dependencies", "firebase", "auth", "check-user-status", "account", "event-handlers", "logged-in-functionality"], 
  function(dependencies, firebase, auth, status, account, eventHand, loggedInFunctionality) {
    loggedInFunctionality();

  var ref = new Firebase("https://superdate.firebaseio.com");
  ref.child("users").once("value", function(snapshot){
    var users = snapshot.val();
    console.log("users", users);
    //popdom.displayData(users);
  });



});