import Ember from 'ember';

export default Ember.Controller.extend({
  assignedEmployee: undefined,
  assignedEmployeeStatement: Ember.computed('assignedEmployee', function() {
    if(Ember.isEmpty(this.get('assignedEmployee'))){
      return 'Unassigned';
    } else {
      return this.get('assignedEmployee.fullName');
    }
  }),

  actions: {
    saveAppointment() {
      let appointment = this.get('appointment');

      if(appointment.get('employee').get('id') === undefined){
        console.log("we are hereeee");
        appointment.set('employee', this.get('store').findRecord('employee', 0));
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

      appointment.save().then(transitionToPost).catch(failure);
    },

    assignedEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        let model = this.get('appointment');
        model.set('employee', employee);
        this.set('assignedEmployee', employee);
      }
    }
  }
});


