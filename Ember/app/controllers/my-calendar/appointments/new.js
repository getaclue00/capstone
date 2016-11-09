import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAppointment() {
      let appointment = this.get('appointment');

      var self = this;

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('my-calendar');
      }

      function failure(reason) {
        // handle the error
        console.error('There was an error saving an appointment: ');
        console.error(reason);
      }

      appointment.save().then(transitionToPost).catch(failure);
    },
  }
});
