import Ember from 'ember';

export default Ember.Controller.extend({
  stringThatIsUsedForModalIdInTemplate: `myModal`,
  flashMessages: Ember.inject.service(),

  actions: {
    saveAppointment() {
      var self = this;

      var flashMessages = self.get('flashMessages');
      let appointment = self.get('appointment');

      appointment.save().then(transitionToPost).catch(onError);

      function transitionToPost() {
        self.transitionToRoute('my-calendar');
      }

      function onError() {
        let modalId = self.get('stringThatIsUsedForModalIdInTemplate');
        Ember.$(`#${modalId}`).scrollTop(0);

        var message = "";
        var errors = self.get('appointment').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

    },

    goBackToCalendar() {
      this.transitionToRoute('my-calendar');
    },

    showModal() {
      let modalId = this.get('stringThatIsUsedForModalIdInTemplate');
      Ember.$(`#${modalId}`).modal('show');
    }
  }
});
