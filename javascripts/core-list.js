define(["dependencies", "firebase", "auth", "check-user-status", "account", "event-handlers", "logged-in-functionality"], 
  function(dependencies, firebase, auth, status, account, eventHand, loggedInFunctionality) {
    loggedInFunctionality();

  var ref = new Firebase("https://superdate.firebaseio.com");
  ref.child("users").once("value", function(snapshot){
    var users = snapshot.val();
    console.log("users", users);
    //popdom.displayData(users);
  });

  // ref.child("users").orderByChild('uid').equalTo(auth.getAuthData().uid).once("value", function(snapshot){
  //   var myprofile = snapshot.val();
  //   console.log("myProfile", myprofile);
  //   //popdom.displayData(users);
  // });

  // ref.child("my-likes").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
  //   var myLikes = snapshot.val();
  //   console.log("myLikes", myLikes);
  // });

  // ref.child("my-admirers").orderByKey().equalTo(auth.getUid()).on("child_added", function(snapshot, prevChildKey){
  //   var likedBy = snapshot.val();
  //   console.log("likedBy", likedBy);
  // });

});