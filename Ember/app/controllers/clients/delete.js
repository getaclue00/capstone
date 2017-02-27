import Ember from 'ember';

export default Ember.Controller.extend({
  type: "client",
  flashMessages: Ember.inject.service(),
  actions: {
    deleteClient() {
      var flashMessages = this.get('flashMessages');
      var self = this;
      let client = this.get('model');

      function onSuccessful() {
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('clients');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger("Client was not successfully deleted");
      }

      if (client) {
        client.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
