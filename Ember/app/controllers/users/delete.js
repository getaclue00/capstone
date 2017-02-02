import Ember from 'ember';

export default Ember.Controller.extend({
  type: "user",
  actions: {
    deleteUser() {

      var self = this;
      let user = self.get('model');

      function onSuccessful() {
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        throw error.message;
      }

      if (user) {
        user.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
