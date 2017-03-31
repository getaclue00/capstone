// This is the controller for the new page of services

import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    // Action for saving a new service
    saveService() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      let service = self.get('model');

      function transitionToPost() {
        self.transitionToRoute('services');
      }

      function onError() {
        Ember.$('.modal').scrollTop(0);
        var message = "";
        var errors = self.get('model').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

      service.save().then(transitionToPost).catch(onError);
    }
  }
});
