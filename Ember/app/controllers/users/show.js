import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  confirm: undefined,
	actions: {

    updateUser() {
      var self = this;
      var flashMessages = self.get('flashMessages');

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

     //  if (self.get('model').get('confirm') === self.get('model').get('password')){
	    // 	self.get('model').save().then(onSuccessful).catch(onError);
	    // }else{
	    // 	window.scrollTo(0,0);
     //    flashMessages.danger('Error: passwords do not match!');
	    // }
      console.log("from controller**********************");
      console.log("confrirm is "+self.get('confirm'));
      console.log("password is "+self.get('model').get('password') );
      if (self.get('model').get('password') === self.get('confirm')){
        self.get('model').save().then(onSuccessful).catch(onError);
      }else{
        //dont display error if password is
        window.scrollTo(0,0);
        flashMessages.danger('Error: passwords do not match!');
      }
    }
  }
});



