define(function(require) {
 var authData = null;

 return {
   getAuthData: function() {
     return authData;
   },
   setAuthData: function(data) {
     authData = data;
   }
 };
});