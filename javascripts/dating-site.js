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

require(
  ["jquery","lodash", "hbs","q", "bootstrap", "firebase", "auth"], 
  function($,_, Handlebars, Q, bootstrap, firebase, auth) {
  var ref = new Firebase("https://superdate.firebaseio.com");
  var authData = ref.getAuth();
  console.log("authData", authData);

  $("#login").on("click", function() {
    console.log("authData", authData);
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } 
      else {
        console.log("Authenticated successfully with payload:", authData);
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

    /*
      You can choose to use the REST methods to interact with
      Firebase, or you can use the Firebase API with event
      listeners. It's completely up to each team.

      If you choose the former, I created two boilerplate modules
      named `potential-mates.js`, and `add-favorite.js`.
     */


    
  }
);
