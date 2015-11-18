define(["jquery", "q", "lodash", "varsPassed", "profilePopulator", "firebase"],
	function($, Q, _, varsPassed, proPop, firebase){

	//private
		var uidOFClicked;

	return{


		getClickedUid : function(){
			return uidOFClicked;
		},

		 attachClick: function(auth){

		 	console.log("auth >>>>>>>>>>>>>>>>>>>>", auth);

		 	console.log("vars passed all returns", varsPassed.getAllReturned());
			
			var deferred = Q.defer();

					var clickedUidObj ={};


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
							$("#user_profile_panel").html(mateTemplate(clickedUidObj));

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
				              		console.log("you liked it", varsPassed.getSelectedUid());

				              		
				              		//get current likes of logged in user
				              		var currentLikes = varsPassed.getAllReturned()[auth.uid].likes;

				              		console.log("currentLikes", currentLikes);
				              		//attach auth uid of logged in to likedBy key
				              		
				              		var loggedInUid = auth.uid.split(":");
				              		console.log("logged in", loggedInUid[1]);

				              		var nums = loggedInUid[1];

				              		console.log("nums", nums);

				              		var urlToFb = "https://superdate.firebaseio.com/users/facebook%3A"+nums;
				              		console.log("gb url ", urlToFb);


				              		//post to firebase
				              		var usrFirebaseRef = new Firebase("https://superdate.firebaseio.com/users/facebook%3A"+nums);

				              		var likesRef = usrFirebaseRef.child("likes");

				              		//update user likes with whatever the uid of user they clicked on is
				              		likesRef.update({
									  [varsPassed.getSelectedUid()]: varsPassed.getSelectedUid()
									});

				              		 




				                	$("#user_profile_panel").fadeOut(500);
				              });
			              
			              });

					return deferred.promise;


				}

   };
});