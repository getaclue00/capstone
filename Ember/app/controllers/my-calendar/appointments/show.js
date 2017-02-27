import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  flashMessages: Ember.inject.service(),
  stringThatIsUsedForModalIdInTemplate: `myModal`,

  actions: {
    deleteAppointment() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      let appointment = self.get('appointment');

      function transitionToPost() {
        let modalId = self.get('stringThatIsUsedForModalIdInTemplate');
        Ember.$(`#${modalId}`).modal('hide');
        self.transitionToRoute('my-calendar');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Appointment was not successfully deleted');
      }

      appointment.destroyRecord()
        .then(transitionToPost)
        .catch(failure);
    },

    saveAppointment() {
      var self = this;
      let appointment = self.get('appointment');
      var flashMessages = self.get('flashMessages');

      function transitionToPost() {
        let modalId = self.get('stringThatIsUsedForModalIdInTemplate');
        Ember.$(`#${modalId}`).modal('hide');
        self.transitionToRoute('my-calendar');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Appointment was not successfully updated');
      }

      appointment.save()
       .then(transitionToPost)
       .catch(failure);
    }
  }
});
