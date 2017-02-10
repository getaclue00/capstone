import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAppointment() {
      let appointment = this.get('appointment');

      appointment.save().then(transitionToPost).catch(failure);

      var self = this;

      function transitionToPost() {
        Ember.$('#myModal').modal('hide');
        self.transitionToRoute('my-calendar');
      }

      function failure(error) {
        // handle the error
        throw error.message;
      }

    }
  }
});
