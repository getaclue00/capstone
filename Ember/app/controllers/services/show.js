import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    closeModal() {
      this.transitionToRoute('services');
    },

    saveService() {
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
