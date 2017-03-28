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

      // function onError() {
      //   window.scrollTo(0,0);
      //   var message = "";
      //   var errors = self.get('model').get('errors.messages')[0];
      //   for (var key in errors){
      //       message+=(key+ " "+ errors[key]+"! ");
      //   }
      //   flashMessages.danger('Account was not successfully created');
      //   flashMessages.danger(message);
      // }

      function onError(err) {
        window.scrollTo(0,0);
        flashMessages.danger('Account was not successfully created');
        flashMessages.danger(self.get('model').get('errors.messages')[0]);
      }

      if (self.get('model').get('confirm') === self.get('model').get('password')){
          user.save().then(onSuccessful).catch(onError);
	    }else{
	    	window.scrollTo(0,0);
        flashMessages.danger('Passwords do not match!');
	    }
    }
  }
});
