define(["jquery", "hbs", "q", "varsPassed"], function($, hbs, Q, varsPassed){

return function(){	 

		var deferred = Q.defer();

		console.log("its on the snippet");

		require(["hbs!../templates/filter_mates"], function(mateTemplate){
		                $("#user-output").html(mateTemplate(varsPassed.getFiltered()));
		  });

		// //resolve promise
	   		deferred.resolve();

	   	return deferred.promise;	

	}

});

