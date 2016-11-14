import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteAppointment() {
      var self = this;
      let appointment = this.get('model');

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('my-calendar');
      }

      function failure(error) {
        // handle the error
        throw error.message;
      }

      appointment.destroyRecord()
        .then(transitionToPost)
        .catch(failure);
    },

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

      appointment.save()
       .then(transitionToPost)
       .catch(failure);
    }
  }
});
