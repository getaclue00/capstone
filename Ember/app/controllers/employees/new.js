import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    saveEmployee() {
      let employee = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError(error) {
        throw error.message;
      }

      employee.save().then(transitionToPost).catch(onError);
    }
  }
});
