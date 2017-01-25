import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {

    updateUser() {
      var self = this;

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        throw error.message;
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')){
	    	this.get('model').save().then(onSuccessful).catch(onError);
	  }else{
	    	console.log("Passwords dont match");
	  }   
    }
  }
});
