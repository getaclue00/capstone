import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

	actions: {
    // Action for saving a new service
    createUser() {
      var flashMessages = this.get('flashMessages');
      let user = this.get('model');

      var self = this;

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        window.scrollTo(0,0);
        flashMessages.danger('Account was not created');
        throw error.message;
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')){
          user.save().then(onSuccessful).catch(onError);
	    }else{
	    	window.scrollTo(0,0);
        flashMessages.danger('Passwords do not match!');
	    }
    }
  }
});
