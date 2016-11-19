import Ember from 'ember';

export default Ember.Controller.extend({
  type: "employee",
  actions: {
    deleteEmployee(employee) {
      function onSuccessful() {
        console.log('Successfully deleted');
      }
      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
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
