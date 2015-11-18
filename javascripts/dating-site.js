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

require(["dependencies", "firebase", "oauth", "auth", "check-user-status", "account", "templates", "logged-in-functionality"], 
  function(dependencies, firebase, oauth, auth, status, account, templates, loggedInFunctionality) {
    
    if(auth.getAuthData() === null) {
     $("body").html(templates.login());
    }

    $(document).on("click", "#login", function(){
      oauth.load().then(function(authData) {
        if (authData === null) {
          // Load login template
          // $("body").html(templates.login());
        } else {
          require(["core-list"], function(corelist) {
            auth.setAuthData(authData);
            $("body").html(templates.main());
            loggedInFunctionality(auth.getAuthData());
          });
        }
        
      }).fail();

    });






  var ref = new Firebase("https://superdate.firebaseio.com");
  var authData = ref.getAuth();

});