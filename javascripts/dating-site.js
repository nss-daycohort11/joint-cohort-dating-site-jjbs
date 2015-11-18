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

require(["dependencies", "firebase", "oauth", "auth", "check-user-status", "account", "templates", "logged-in-functionality", "submit-profile-info", "varsPassed"], 
  function(dependencies, firebase, oauth, auth, status, account, templates, loggedInFunctionality, submitProfileInfo, varsPassed) {

     $("body").html(templates.login());

    $("#login").on("click", function() {
      oauth.load().then(function(authData) {
        if (authData === null) {
          // Load login template
          // $("body").html(templates.login());
        } else {
          require(["core-list"], function(corelist) {
            auth.setAuthData(authData);
            $("body").html(templates.main());
            loggedInFunctionality(auth.getAuthData());

            console.log("authDataUid", authData.uid);

            //set uid for logged in user
            varsPassed.setUidOfLoggedIn(authData.uid);

            //set img link for logged in user
            varsPassed.setProfilePic(authData.facebook.profileImageURL);


            //load profile pic for logged in user
              //need to cache  auth data return as well as profile pic
            $("#nav_profile_image").attr("src",  authData.facebook.profileImageURL );


            //when edit submit btn is clicked, update firebase object with appropriate key value pairs,

            $("body").on("click", "#submit_to_fb", function(){
              submitProfileInfo();
            })

            //call module to handle this


          });
        }
        
      }).fail();

    });






  var ref = new Firebase("https://superdate.firebaseio.com");
  var authData = ref.getAuth();

});