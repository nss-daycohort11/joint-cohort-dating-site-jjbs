define(["jquery", "q", "lodash"],function($, Q, _){
	//private
	var uidSelected;
	var filteredObjectList = {};
	var currentUser = {};
	var uidOfLoggedIn;
	var profilePicForLogged;


	return {

		getSelectedUid: function(){
			return uidSelected;
		},

		setUid: function(value){
			uidSelected = value;
		},

		getFiltered: function(){
			return filteredObjectList;
		},

		setFiltered : function(value){
			filteredObjectList = value;
		},

		getCurrentUser: function(){
			return currentUser;
		},

		setCurrentUser: function(value){
			currentUser = value;
		},

		getUidofLoggedIn: function(){
			return uidOfLoggedIn
		},

		setUidOfLoggedIn: function(value){
			uidOfLoggedIn = value;
		},

		getProfilePic : function(){
			return profilePicForLogged;
		},

		setProfilePic : function(value){
			profilePicForLogged = value;
		}



	};

});