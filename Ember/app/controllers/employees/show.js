import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateEmployee() {
      var self = this;

      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        throw error.message;
      }

      this.get('model').save().then(onSuccessful).catch(onError);
    }
  }
});
