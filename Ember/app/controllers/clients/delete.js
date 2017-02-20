import Ember from 'ember';

export default Ember.Controller.extend({
  type: "client",
  actions: {
    deleteClient() {

      var self = this;
      let client = this.get('model');

      function onSuccessful() {
        console.log('Successfully deleted');
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('clients');
      }

      function onError(error) {
        throw error.message;
      }

      if (client) {
        client.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
