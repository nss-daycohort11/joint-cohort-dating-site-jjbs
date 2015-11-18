define(["jquery", "firebase", "q", "varsPassed"], 
	function($, firebase, Q, varsPassed){

		var objectToPush;

		return function(){

			//get inputs
			var nameEntered = $("#profile_name").val();
			var genderEntered = $("#profile_gender").val();
			var locationEntered = $("#profile_location").val();
			var supernameEntered = $("#profile_supername").val();
			var nemesisEntered = $("#profile_nemesis").val();
			var speciesEntered = $("#profile_species").val();
			var selectedPower = $('input:radio[name=power-selector]').val();


			//store inputs in object to push
			objectToPush = {
				gender: genderEntered,
				location: locationEntered,
				nameReal: nameEntered,
				nameSuper: supernameEntered,
				nemesis: nemesisEntered,
				species: speciesEntered,
				superPower: selectedPower,
				uid: varsPassed.getUidofLoggedIn(),
				profilePic: varsPassed.getProfilePic()

			}

			//push to firebase
			if( nameEntered !== "" && genderEntered !== "" && locationEntered !== "" && supernameEntered !== ""
				&& nemesisEntered !== "" && speciesEntered !== "" && selectedPower !== ""){
				
				//ajax post call to firebase
				$.ajax({
					url: "https://superdate.firebaseio.com/users.json",
					method: "POST",
					data: JSON.stringify(objectToPush)
				}). done(function(){
					console.log("YEEHAWW");
         			$("#signed_in_user_profile_panel").css("display", "none");
         			$("#edit_panel").css("display", "none");
         			$("#main_output").fadeIn("slow");
				});
			}

			
		}

});