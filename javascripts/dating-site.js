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

require(["dependencies", "firebase", "auth", "check-user-status", "account"], 
  function(dependencies, firebase, auth, status, account) {
  var ref = new Firebase("https://superdate.firebaseio.com");
  var authData = ref.getAuth();

  $("#login").on("click", function() {
    console.log("authData", authData);
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } 
      else {
        var newUser = status.isNewUser(authData.uid);
        if (newUser) {
          console.log("This is a new user");
          // Create this module
          //account.create(authData);
        }
        if (!newUser) {
          auth.setUid(authData.uid);
          require(["core-list"], function(corelist) {});
        }
      }
    });
  });
 
  $(document).ready(function() {
    $('#pic').hide();
    $('#login').hover(function() {
      $('#pic').show();
    },function() {
      $('#pic').hide();
    });
  });
});
