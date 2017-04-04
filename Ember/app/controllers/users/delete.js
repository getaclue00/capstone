import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  type: "user",
  actions: {
    deleteUser() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      let user = self.get('model');

      function onSuccessful() {
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Error: account was not successfully deleted');
      }

      if (user) {
        user.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
