define(function(require){
  var _ = require("lodash");
  var fb = require("firebase");
  var auth = require("auth");
  var eventHand = require("event-handlers");
  //var popdom = require("populate-dom"); // This is where the firebase data will be sent

  var ref = new Firebase("https://superdate.firebaseio.com");
  ref.child("users").once("value", function(snapshot){
    var users = snapshot.val();
    console.log("users", users);
    //popdom.displayData(users);
  });

  ref.child("users").orderByChild('uid').equalTo(auth.getUid()).once("value", function(snapshot){
    var myprofile = snapshot.val();
    console.log("myProfile", myprofile);
    //popdom.displayData(users);
  });

  ref.child("my-likes").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
    var myLikes = snapshot.val();
    console.log("myLikes", myLikes);
  });

  ref.child("my-admirers").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
    var likedBy = snapshot.val();
    console.log("likedBy", likedBy);
  });
});