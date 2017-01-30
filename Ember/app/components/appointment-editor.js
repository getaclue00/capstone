import Ember from 'ember';

export default Ember.Component.extend({

  wasServiceSelected: Ember.computed('model.service', function(){
    let service = this.get('model.service');

    if (service) {
      if (service.get('name') && service.get('duration')) {
        return true;
      }
    } else {
      return false;
    }
  }),

  aSelectedService: Ember.computed('model.service', function(){
    return this.get('model.service');
  }),

  aSelectedEmployee: Ember.computed('model.employee', function(){
    return this.get('model.employee');
  }),

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('model').set('employee', employee);
      }
    },

    selectService(service) {
      if(!Ember.isEmpty(service)){
        this.get('model').set('service', service);
      }
    }
  }
});
