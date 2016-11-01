import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveService() {
      let service = this.get('model');

      var self = this;

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('services');
      }

      function failure(reason) {
        // handle the error
        console.error('There was an error saving the service: ');
        console.error(reason);
      }

      service.save().then(transitionToPost).catch(failure);
    }
  }
});
