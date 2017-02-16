import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

	actions: {
    // Action for saving a new client
    saveClient() {
      var flashMessages = this.get('flashMessages');

      let client = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('clients');
      }

      function failure(error) {
        window.scrollTo(0,0);
        flashMessages.danger("Client was not successfully created");
        throw error.message;
      }

      client.save().then(transitionToPost).catch(failure);
    }
  }
});
