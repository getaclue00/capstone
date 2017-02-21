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

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Service was not successfully created');
      }

      service.save().then(transitionToPost).catch(failure);
    }
  }
});
