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
    },

    goBackToCalendar() {
      // check if any attributes have been changed
      let appointment = this.get('appointment');
      let modalId = this.get('stringThatIsUsedForModalIdInTemplate');

      if (appointment.get('hasDirtyAttributes')) {
        // remove any changes since they would be commited via Save button
        // this would be a good place to prompt user to see if they want to save the changes
        appointment.rollbackAttributes();
      }
      Ember.$(`#${modalId}`).modal('hide');
      this.transitionToRoute('my-calendar');
    },

    showModal() {
      let modalId = this.get('stringThatIsUsedForModalIdInTemplate');
      Ember.$(`#${modalId}`).modal('show');
    }
  }
});
