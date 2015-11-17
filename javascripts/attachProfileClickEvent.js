define(["jquery", "q", "lodash", "varsPassed", "profilePopulator"],function($, Q, _, varsPassed, proPop){

	//private
		var uidOFClicked;

	return{


		getClickedUid : function(){
			return uidOFClicked
		},

		 attachClick: function(){
			

			//I PUT IN AJAX CALL FOR TESTING BECAUSE IT WASNT OBEYING AND WAS ATTACHING CLICK PREMATURELY


				//replace this get code with firebase module by team, but for now I just got from firebase
				$.ajax({
					  url: "https://radiant-inferno-9240.firebaseio.com/songs.json",
					  method: "GET"
				}).done(function(usersReturned){

					//set object to hold specific clicked uid
					var clickedUidObj ={}


				 //attach event listener
			              $(".user_snippet").click(function(){

			              		//set uid to work with
			               		uidOFClicked = $(this).attr("id");

			               		//make uid able to be passed to different modules if needed
			               		varsPassed.setUid($(this).attr("id"));

			                $("#user_profile_panel").fadeIn(500);

			                //loop through filtered and find matching key
			                for(var key in varsPassed.getFiltered()){
			                	if(key === uidOFClicked){
			                		console.log("match");
			                		clickedUidObj = varsPassed.getFiltered()[key];
			                	}
			                }

			                console.log("here is our object", clickedUidObj);


			                //populate prof based on clicked
			                 require(["hbs!../templates/indiv_profile"], function(mateTemplate){
							$("#user_profile_panel").html(mateTemplate(clickedUidObj))
							});

				             //attach exit click  SAME ISSUE AS BEFORE
				                	$("#kill_panel").click(function(){
				                		console.log("meh");
				                		 $("#user_profile_panel").fadeOut(100);
				                	});

				             //attach like click 
				                	$("#like_button").click(function(){
				                		console.log("you liked it");
				                		
				                	});

			                 



			              });

			         

				});
			}





   }
});