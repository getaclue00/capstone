import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
	actions: {

    updateUser() {
      var flashMessages = this.get('flashMessages');
      var self = this;

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        window.scrollTo(0,0);
        flashMessages.success('Account was not updated');
        throw error.message;
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')){
	    	this.get('model').save().then(onSuccessful).catch(onError);
	  }else{
	    	window.scrollTo(0,0);
        flashMessages.success('Passwords do not match!');
	  }   
    }
  }
});
