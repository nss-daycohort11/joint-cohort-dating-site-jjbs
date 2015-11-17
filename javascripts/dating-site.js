require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    "firebase": '../lib/bower_components/firebase/firebase.js'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(
  ["jquery", "lodash", "filter_mates", "q", "attachProfileClickEvent", "varsPassed", "snippetGeneration"], 
  function($,_,filter_mates, Q, proClick, varsPassed, snippetGeneration) {

    //Show signed-in profile OR dashboard
      $("#pro_nav").click(function(){
        $("#main_output").css("display", "none");

         require(["hbs!../templates/signed_indiv_profile"], function(mateTemplate){
                $("#signed_in_user_profile_panel").html(mateTemplate(varsPassed.getCurrentUser()));
              });

              require(["hbs!../templates/favorited_panel"], function(mateTemplate){
                //Need to pass current user obj. favorited key below 
                $("#signed_in_user_profile_panel").append(mateTemplate());
              });
        $("#signed_in_user_profile_panel").fadeIn("slow");
      });

      $("#home_nav").click(function(){
        $("#signed_in_user_profile_panel").css("display", "none");
        $("#main_output").fadeIn("slow");
      });





    //Filter functionality  
        //Filter button is disabled until a value is selected on radio buttons
         $('input:radio[name=power-type]').change(function(){
            $(".filter-btn").attr("disabled", false);
         });


        //Filter mates on filter btn click
        $(".filter-btn").click(function(){

          var filteredUsers = {}
          
          console.log($('input:radio[name=power-type]:checked').val());

          //ajax with a promise
          filter_mates()
          .then(function(returnedData){

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

              console.log("filteredUsers", filteredUsers);

              //set Filtered Object as accessible variables
              varsPassed.setFiltered(filteredUsers);

            //populate right side of main.html with filtered results (pass to hbs template)
            return snippetGeneration();


          }).then(function(){ 
              console.log("inside second then");
              proClick.attachClick();
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
    
  }
);
