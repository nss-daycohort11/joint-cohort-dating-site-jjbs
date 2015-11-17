define(["jquery", "q", "lodash"],function($, Q, _){

	return function(){

		var deferred = Q.defer();

		//replace this get code with firebase module by team, but for now I just got from firebase
		$.ajax({
			  url: "https://superdate.firebaseio.com/users.json",
			  method: "GET"
		}).done(function(usersReturned){
			console.log(usersReturned);

			//resolve Promise
			deferred.resolve(usersReturned);

		});

		//return resolved promise
		return deferred.promise;
	};
});