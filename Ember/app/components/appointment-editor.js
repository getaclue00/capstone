import Ember from 'ember';

export default Ember.Component.extend({

  serviceSelected: Ember.computed('model.service', function(){
    let service = this.get('model.service');
    if (service) {
      return service;
    } else {
      return undefined;
    }
  }),

  employeeSelected: Ember.computed('model.employee', function(){
    let employee = this.get('model.employee');
    if (employee) {
      return employee;
    } else {
      return undefined;
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectEmployee(employee, model) {
      if(!Ember.isEmpty(employee)){
        model.set('employee', employee);
        this.set('employeeSelected', true);
      }
    },

    resetEmployee(model, employee) {
      if(!Ember.isEmpty(employee)){
        model.set('employee', undefined);
        this.set('employeeSelected', false);
      }
    },

    selectService(service, model) {
      if(!Ember.isEmpty(service)){
        model.set('service', service);
        this.set('serviceSelected', true);
      }
    },

    resetService(model, service) {
      if(!Ember.isEmpty(service)){
        model.set('service', undefined);
        this.set('serviceSelected', false);
      }
    }
  }
});
