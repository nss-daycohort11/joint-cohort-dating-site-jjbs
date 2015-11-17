define(["jquery", "q", "lodash"],function($, Q, _){
	//private
	var uidSelected;
	var filteredObjectList = {}
	var currentUser = {}


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
		}



	}

});