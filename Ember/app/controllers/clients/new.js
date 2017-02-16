import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
    // Action for saving a new client
    saveClient() {
      let client = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('clients');
      }

      function failure(error) {
        // handle the error
        throw(error.message);
      }

      client.save().then(transitionToPost).catch(failure);
    }
  }
});
