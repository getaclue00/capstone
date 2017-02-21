import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {

    saveEmployee() {
      var self = this;

      let employee = self.get('model');
      var flashMessages = self.get('flashMessages');

      function transitionToPost() {
        self.transitionToRoute('employees');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Employee was not successfully created');
      }

      employee.save().then(transitionToPost).catch(onError);
    }
  }
});
