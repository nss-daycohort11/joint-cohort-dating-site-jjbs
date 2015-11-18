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

/*    
--> Directions: (section 2) (section 1 located in index.html)
    2) Set up require config at top of the page, and add all shims (mainly bootstrap -> jquery) 
    3) Pass in all javascript modules that you are working with above, in the require list  --> e.g. require(["yourModuleListHere", "another-module"])
    4) after step 3, set up your (anonymous) function:
          - This function has parameter(s)
             -> e.g. firebase, loggedInFunctionality, etc. 
          - These parameters reference the javascript modules that were set up in step 3
          - The function will eventually hold/reference all app logic
    5)  Set up an html file/template (such as index), that you can begin testing on
          - the html handlebars templates are located in 'templates.js'
    6) Set up authentication 
*/
  
    // load login handlebars template inside body element
     $("body").html(templates.login());

    // run function on login btn click
    $(document).on("click", "#login", function(){

      //run load method from oauth.js
      oauth.load()

      .then(function(authData) {

             // load core-list.js and run function after it's loaded
              require(["core-list"], function(corelist) {

              // run setAuthData method from auth.js, and pass in authData
              // this stores authData so that we can access it in other modules
              auth.setAuthData(authData);

              // load main handlebars template inside body element
              $("body").html(templates.main());

              //pass authdata variable into the logged-in-functionality.js module
              //then run logged in functionality module
              loggedInFunctionality(auth.getAuthData());

            });
          });

        
      });

});