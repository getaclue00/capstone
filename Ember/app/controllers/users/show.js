import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
	actions: {

    updateUser() {
      var self = this;
      var flashMessages = self.get('flashMessages');

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        window.scrollTo(0,0);
        flashMessages.danger('Account was not updated');
        throw error.message;
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')){
	    	this.get('model').save().then(onSuccessful).catch(onError);
	    }else{
	    	window.scrollTo(0,0);
        flashMessages.danger('Passwords do not match!');
	    }
    }
  }
});



