import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
    // Action for saving a new service
    createUser() {
      let user = this.get('model');

      var self = this;

      function onSuccessful() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('employees');
      }

      function onError(reason) {
        console.error('There was an error saving the user: ');
        console.error(reason);
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')){
          user.save().then(onSuccessful).catch(onError);
	  }else{
	    	console.log("Passwords dont match");
	  }   
    }
  }
});
