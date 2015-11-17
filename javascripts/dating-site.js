require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    "firebase": '../lib/bower_components/firebase/firebase.js'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(
  ["jquery", "logged-in-functionality"], 
  function($, loggedInFunctionality) {

    loggedInFunctionality();

  }
);
