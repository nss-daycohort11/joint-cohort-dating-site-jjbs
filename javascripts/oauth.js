define(["jquery", "firebase", "q", "auth", "templates", "logged-in-functionality"],
	function($, fb, Q, auth, templates, loggedInFunctionality) {
  var q = require("q");
  var ref = new Firebase("https://superdate.firebaseio.com");
  var authData = ref.getAuth();

  return {
  	load: function() {
  		var deferred = q.defer();

	      ref.authWithOAuthPopup("facebook", function(error, authData) {
	        if (error) {
	        	deferred.reject(error);
	          console.log("Login Failed!", error);
	        } else {
	        	deferred.resolve(authData);
	          require(["core-list"], function(corelist) {
	            auth.setAuthData(authData);
	            $("body").html(templates.main());
	            loggedInFunctionality(auth.getAuthData());
	          });
	        }
	      });  		

  		return deferred.promise;
  	}
  }

 
});