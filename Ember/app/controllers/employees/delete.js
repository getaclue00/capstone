import Ember from 'ember';

export default Ember.Controller.extend({
  type: "employee",
  actions: {
    deleteEmployee() {

      var self = this;
      let employee = this.get('model');

      function onSuccessful() {
        transitionToPost();
      }
      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        throw error.message;
      }

      if (employee) {
        employee.destroyRecord().then(onSuccessful).catch(onError);
      }
    }
  }
});
