import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

	actions: {
    // Action for saving a new service
    createUser() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      let user = self.get('model');

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Account was not successfully created');
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
