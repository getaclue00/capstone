import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    closeModal() {
      this.transitionToRoute('services');
    },

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
    },

    updateService() {
      var self = this;

      function onSuccessful() {
        self.transitionToRoute('services');
      }

      function onError(error) {
        // handle the error
        throw error.message;
      }

      this.get('model').save().then(onSuccessful).catch(onError);
    }
  }
});
