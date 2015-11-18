define(function(require){
  var $ = require("jquery");

  $(document).on("click", "#profile_submit", function(){
    var ref = new Firebase("https://superdate.firebaseio.com/users");
    var authData = ref.getAuth();
    var profileObj = buildNewProfile(authData);
    ref.child(authData.uid).set(profileObj);
  });

  var buildNewProfile = function(data) {
    var uid = data.auth.uid;
    var facebook = data.facebook.cachedUserProfile;
    var nameReal = facebook.name;
    var gender = facebook.gender;
    var image = facebook.picture.data.url;
    var nameSuper = document.getElementById("supername").value;
    var species = document.getElementById("species").value;
    var location = document.getElementById("location").value;
    var nemesis = document.getElementById("nemesis").value;
    var superPower = document.editProfile.power.value;
    var profileObj = {
      "uid": uid,
      "nameSuper": nameSuper,
      "nameReal": nameReal,
      "gender": gender,
      "image": image,
      "species": species,
      "location": location,
      "nemesis": nemesis,
      "superPower": superPower
    };
    return profileObj;
  };

});