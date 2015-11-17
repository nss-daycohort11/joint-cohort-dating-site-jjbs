define(["jquery", "q", "lodash", "varsPassed", "profilePopulator"],function($, Q, _, varsPassed, proPop){

	//private
		var uidOFClicked;

	return{


		getClickedUid : function(){
			return uidOFClicked
		},

		 attachClick: function(){
			
			var deferred = Q.defer();

			//I PUT IN AJAX CALL FOR TESTING BECAUSE IT WASNT OBEYING AND WAS ATTACHING CLICK PREMATURELY


				//replace this get code with firebase module by team, but for now I just got from firebase
				// $.ajax({
				// 	  url: "https://radiant-inferno-9240.firebaseio.com/songs.json",
				// 	  method: "GET"
				// }).done(function(usersReturned){

					//set object to hold specific clicked uid
					var clickedUidObj ={}


				 //attach event listener

			        $("body").on('click', ".user_snippet",  function(){

			              		//set uid to work with
			               		uidOFClicked = $(this).attr("id");

			               		//make uid able to be passed to different modules if needed
			               		varsPassed.setUid(uidOFClicked);
			               		console.log("varsPassed.get", varsPassed.getSelectedUid());

			                $("#user_profile_panel").fadeIn(500);

			                //loop through filtered and find matching key
			                for(var key in varsPassed.getFiltered()){
			                	console.log("key", key);
			                	if(varsPassed.getFiltered()[key].uid === uidOFClicked){
			                		console.log("match");
			                		clickedUidObj = varsPassed.getFiltered()[key];
			                	}else{
			                		console.log("Nope!");
			                	}
			                }

			                console.log("here is our object", clickedUidObj);


			                //populate prof based on clicked
			                 require(["hbs!../templates/indiv_profile"], function(mateTemplate){
							$("#user_profile_panel").html(mateTemplate(clickedUidObj))

								 //resolve the promise
					            deferred.resolve();

							});

				             //attach exit click  SAME ISSUE AS BEFORE

				              $("body").on('click', "#kill_panel", function(){
				              	console.log("meh");
				                		 $("#user_profile_panel").fadeOut(500);
				              });

				             //attach like click 
				                $("body").on('click', "#like-button", function(){
				              		console.log("you liked it");
				                	$("#user_profile_panel").fadeOut(500);
				              });
			              
			              });

					return deferred.promise;


				}

   }
});