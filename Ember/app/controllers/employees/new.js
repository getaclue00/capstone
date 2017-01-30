import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    closeModal() {
      this.transitionToRoute('employees');
    },

    saveEmployee() {
      let employee = this.get('model');

      var self = this;

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('employees');
      }

      function failure(reason) {
        // handle the error
        console.error('There was an error saving the employee: ');
        console.error(reason);
      }

      employee.save().then(transitionToPost).catch(failure);
    }
  }
});
