import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  type: "employee",
  actions: {
    deleteEmployee() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      let employee = self.get('model');

      function onSuccessful() {
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Error: employee was not successfully deleted');
      }

      if (employee) {
        employee.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
