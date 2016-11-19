import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteEmployee(employee) {
      function onSuccessful() {
        console.log('Successfully deleted');
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
