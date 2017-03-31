import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {

    saveEmployee() {
      var self = this;

      let employee = self.get('model');
      var flashMessages = self.get('flashMessages');

      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError() {
        Ember.$('.modal').scrollTop(0);
        var message = "";
        var errors = self.get('model').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

      employee.save().then(transitionToPost).catch(onError);
    }
  }
});
