import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {

    updateService() {
      var self = this;
      var flashMessages = self.get('flashMessages');

      function onSuccessful() {
        self.transitionToRoute('services');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Error: service was not successfully updated');
      }

      this.get('model').save().then(onSuccessful).catch(onError);
    }
  }
});
