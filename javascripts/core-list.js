require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'firebase': '../lib/bower_components/firebase/firebase',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});
require(["dependencies", "firebase", "auth", "check-user-status", "account", "event-handlers", "logged-in-functionality"], 
  function(dependencies, firebase, auth, status, account, eventHand, loggedInFunctionality) {
    loggedInFunctionality();
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

  // ref.child("my-likes").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
  //   var myLikes = snapshot.val();
  //   console.log("myLikes", myLikes);
  // });

  // ref.child("my-admirers").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
  //   var likedBy = snapshot.val();
  //   console.log("likedBy", likedBy);
  // });

  loggedInFunctionality();
});