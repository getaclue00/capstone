import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  confirm: undefined,
	actions: {

    updateUser() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      let user = self.get('model');

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        var message = "";
        var errors = self.get('model').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

      if (user.get('password') === self.get('confirm')){
        user.save().then(onSuccessful).catch(onError);
      }else{
        window.scrollTo(0,0);
        flashMessages.danger('Error: passwords do not match!');
      }
    }
  }
});



