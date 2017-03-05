import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    saveAppointment() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      let appointment = self.get('appointment');

      appointment.save().then(transitionToPost).catch(failure);

      function transitionToPost() {
        self.transitionToRoute('my-calendar');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Appointment was not successfully created');
      }

    }
  }
});
