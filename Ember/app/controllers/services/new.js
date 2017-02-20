// This is the controller for the new page of services

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    // Action for saving a new service
    saveService() {
      let service = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('services');
      }

      function failure(error) {
        // handle the error
        throw error.message;
      }

      service.save().then(transitionToPost).catch(failure);
    }
  }
});
