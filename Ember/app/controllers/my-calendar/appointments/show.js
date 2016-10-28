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
    }
  }
});
