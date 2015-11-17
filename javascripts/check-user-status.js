define(function(require) {
  var fb = require("firebase");
  var auth = require("auth");

  var ref = new Firebase("https://superdate.firebaseio.com/users");
  var newUser = true;

  // Check existing user to see if the current user uid matches
  function CheckUser(uid, childSnapshot) {
    var uidToCheck = childSnapshot.child("uid").val();
    if (uidToCheck === uid){
      newUser = false;
    }
  }

  return {
    // Loop through all users to check if the current user is new
    isNewUser: function(uid) {
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          CheckUser(uid, childSnapshot);
        });
      }); 
      return newUser;   
    }
  };
});