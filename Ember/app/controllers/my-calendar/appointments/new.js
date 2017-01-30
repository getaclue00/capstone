import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAppointment() {
      let appointment = this.get('appointment');

      //setting employee to default if not set
      if(appointment.get('employee').get('id') === undefined){

        this.store.find('employee', 0).then((employee) => {
          appointment.set('employee', employee);
          appointment.save().then(transitionToPost).catch(failure);
        });

      } else {
        appointment.save().then(transitionToPost).catch(failure);
      }

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

    }
  }
});
