define(["jquery", "q", "lodash", "varsPassed"],function($, Q, _, varsPassed){

	return function(){

			var deferred = Q.defer();

	   require(["hbs!../templates/indiv_profile"], function(mateTemplate){
			$("#user_profile_panel").html(mateTemplate(varsPassed.getFiltered()));
			});

	   		//resolve promise
	   		deferred.resolve();

	   		return deferred.promise;


		
	};


 });