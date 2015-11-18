define(["jquery", "firebase", "q", "auth", "templates", "logged-in-functionality"],
	function($, fb, Q, auth, templates, loggedInFunctionality) {

		  // Reference entre app (all objects) in firebase 
		  var ref = new Firebase("https://superdate.firebaseio.com");

		  //run getAuth method on firebase object above (ref and store result in authData variable)
		  	//--> this will: Synchronously retrieves the current authentication state of the client
		  var authData = ref.getAuth();

  return {
  	load: function() {

  		//begin promise
  		var deferred = Q.defer();


  		// run authWithOAuthPopup on firebase reference --> this takes: authWithOAuthPopup(provider, onComplete, [options])
	      ref.authWithOAuthPopup("facebook", function(error, authData) {

	      	//if there is an error with the authentication
	        if (error) {

	        	// reject promise/ deferred object, and pass error details back out of the promise
	        	deferred.reject(error);

	        	//log the error
	          	console.log("Login Failed!", error);

	        //if there is no error with login
	        } else {

	        	// Resolve the promise and return data from firebase (authData variable we created above)
	        	deferred.resolve(authData);
	        }
	        
	      });  		

			//return state of promise
  			return deferred.promise;
  	}
  };

 
});