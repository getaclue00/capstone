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

      //setting employee to default if not set
      if(appointment.get('employee').get('id') === undefined){

        this.store.find('employee', 0).then((employee) => {
          console.log(employee.get('lastName'));
          appointment.set('employee', employee);
          appointment.save().then(transitionToPost).catch(failure);
        }); 

      }else{
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


