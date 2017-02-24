// This is the controller for the delete page of services

import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  type: "service",
  actions : {

    deleteService() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      let service = self.get('model');

      function transitionToPost() {
        self.transitionToRoute('services');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Service was not successfully deleted');
      }

      service.destroyRecord()
        .then(transitionToPost)
        .catch(failure);
    }
  }
});
