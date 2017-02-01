import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    closeModal() {
      this.transitionToRoute('services');
    },

    updateService() {
      var self = this;

      function onSuccessful() {
        Ember.$('#myModal').modal('hide');
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
