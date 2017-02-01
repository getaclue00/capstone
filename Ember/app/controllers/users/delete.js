import Ember from 'ember';

export default Ember.Controller.extend({
  type: "user",
  actions: {
    deleteUser() {

      var self = this;
      let user = this.get('model');

      function onSuccessful() {
        console.log('Successfully deleted');
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
