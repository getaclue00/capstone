import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAppointment() {
      let appointment = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('my-calendar');
      }

      function failure(reason) {
        // handle the error
        debugger;
      }

      appointment.save().then(transitionToPost).catch(failure);
    }
  }
});
