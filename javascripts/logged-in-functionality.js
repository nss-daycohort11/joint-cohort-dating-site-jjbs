define(
  ["jquery", "waitForData", "lodash", "filter_mates", "q", "attachProfileClickEvent", "varsPassed", "snippetGeneration", "edit-profile"], 
  function($,_, waitForData, filter_mates, Q, proClick, varsPassed, snippetGeneration, editProfile) {

    var signedInUid;

return  function(auth){   //Show signed-in profile OR dashboard

      $("#pro_nav").click(function(){
        $("#main_output").css("display", "none");
        $("#edit_panel").css("display", "none");

        var uidOfCurrentUser = auth.uid;
        console.log("uid of current", uidOfCurrentUser);

        $.ajax({
          url: "https://superdate.firebaseio.com/users.json"
        }).done(function(data){

          console.log("data", data);
          //create object of objects to hold likes
             var likes = {}
            //loop through current data and if data.key.likes includes the same id as current user, output it
            for(var key in data){
              console.log("data.key", data[key].likes);
                for(var likeKeys in data[key].likes){
                  if(likeKeys === auth.uid){
                    likes[key] = data[key];
                  }
                }
            }

            console.log("likes after loop", likes);

          var userToPop = data[uidOfCurrentUser];
      
          //populate current profile of user
         require(["hbs!../templates/signed_indiv_profile"], function(mateTemplate){
                $("#signed_in_user_profile_panel").html(mateTemplate(userToPop));
              });

         //populate people who have liked current person
              require(["hbs!../templates/favorited_panel"], function(mateTemplate){
                //Need to pass current user obj. favorited key below 
                $("#signed_in_user_profile_panel").append(mateTemplate(likes));
              });

        });
        $("#signed_in_user_profile_panel").fadeIn("slow");
      });

      $("#home_nav").click(function(){
        $("#signed_in_user_profile_panel").css("display", "none");
        $("#edit_panel").css("display", "none");
        $("#main_output").fadeIn("slow");
      });

// Show Edit Panel
      $("#edit_nav").click(function(){
        $("#main_output").fadeOut();
         $("#signed_in_user_profile_panel").css("display", "none");
         $("#edit_panel").fadeIn("slow");

    });



    //Filter functionality  
        //Filter button is disabled until a value is selected on radio buttons
         $('input:radio[name=power-type]').change(function(){
            $(".filter-btn").attr("disabled", false);
         });


        //Filter mates on filter btn click
        $(".filter-btn").click(function(){
          signedInUid = auth;
          console.log("the private var", signedInUid);

          var filteredUsers = {};
          
          console.log($('input:radio[name=power-type]:checked').val());

          //ajax with a promise
          filter_mates()
          .then(function(returnedData){

            varsPassed.setAllUsers(returnedData);

            //log data returned
            console.log("data returned", returnedData);

            //filter by value of radio button

              //what to filter by
              var filterBy = $('input:radio[name=power-type]:checked').val();

              //set to lower case
              var loweredFilter = filterBy.toLowerCase();

              for(var key in returnedData){

                if(returnedData[key].superPower.toLowerCase() === loweredFilter){

                  //set each filtered user as a key on filteredUsers object
                  filteredUsers[key] = returnedData[key];
                }
              }



              //set Filtered Object as accessible variables
              varsPassed.setFiltered(filteredUsers);
              console.log("varsPassed.getFiltered", varsPassed.getFiltered());

            //populate right side of main.html with filtered results (pass to hbs template)
            return snippetGeneration();


          }).then(function(){ 
              console.log("inside second then");
              proClick.attachClick(auth);
          });

        });













    //on some profile click from filter, pop up other-profile.html panel page
      //populate from firebase

    //on your profile click on top of page, pop up your-profile.html panel page
      //populate from firebase







    /*
      You can choose to use the REST methods to interact with
      Firebase, or you can use the Firebase API with event
      listeners. It's completely up to each team.

      If you choose the former, I created two boilerplate modules
      named `potential-mates.js`, and `add-favorite.js`.
     */
    
    };
});