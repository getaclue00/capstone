import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    updateEmployee() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      function onSuccessful() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Employee was not successfully updated');
      }

      this.get('model').save().then(onSuccessful).catch(onError);
    }
  }
});
