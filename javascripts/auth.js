define(function(require) {
  var uid = null;

  return {
    getUid: function() {
      return uid;
    },
    setUid: function(newId) {
      console.log("setting user id to", newId);
      uid = newId;
    }
  };
});