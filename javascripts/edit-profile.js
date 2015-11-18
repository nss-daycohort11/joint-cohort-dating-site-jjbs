define(function(require){
  var $ = require("jquery");


  $(document).on("click", "#profile_submit", function(){
    var ref = new Firebase("https://superdate.firebaseio.com/users");
    var authData = ref.getAuth();
    var profileObj = buildNewProfile(authData);
    if(profileObj){
      ref.child(authData.uid).set(profileObj);
      $("#signed_in_user_profile_panel").css("display", "none");
      $("#edit_panel").css("display", "none");
      $("#main_output").fadeIn("slow");
    } else {
      $(".alert-danger").show();
    }
  });

  var buildNewProfile = function(data) {
    var input = collectInputs();
    var valid = validateInputs(input);
    if (valid){
      var uid = data.auth.uid;
      var facebook = data.facebook.cachedUserProfile;
      var nameReal = facebook.name;
      var gender = facebook.gender;
      var image = facebook.picture.data.url;
      var profileObj = {
        "uid": uid,
        "nameSuper": input.nameSuper,
        "nameReal": nameReal,
        "gender": gender,
        "image": image,
        "species": input.species,
        "location": input.location,
        "nemesis": input.nemesis,
        "superPower": input.superPower
      };
      return profileObj;
    }
  };

  var collectInputs = function() {
    var input = {};
    input.nameSuper = document.getElementById("supername").value;
    input.species = document.getElementById("species").value;
    input.location = document.getElementById("location").value;
    input.nemesis = document.getElementById("nemesis").value;
    input.superPower = document.editProfile.power.value;
    return input;
  };

  var validateInputs = function(input) {
    var validInput = true;
    for(var item in input){
      if (!input[item]) {
        validInput = false;
      }
    }
    return validInput;
  };

});