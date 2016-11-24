// This is the controller for the delete page of services

import Ember from 'ember';

export default Ember.Controller.extend({
  type: "service",
  actions : {

    deleteService() {
      var self = this;
      let service = this.get('model');

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('services');
      }

      function failure(error) {
        // handle the error
        throw error.message;
      }

      service.destroyRecord()
        .then(transitionToPost)
        .catch(failure);
    }
  }
});
