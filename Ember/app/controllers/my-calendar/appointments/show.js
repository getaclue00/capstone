import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    deleteAppointment() {
      var self = this;
      let appointment = this.get('appointment');

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

      function failure(error) {
        // handle the error
        throw error.message;
      }

      appointment.save()
       .then(transitionToPost)
       .catch(failure);
    }
  }
});
