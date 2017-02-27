import Ember from 'ember';

export default Ember.Component.extend({

  showLocationMap: false,

  showLocationMapDiv: Ember.computed('model.location', function() {
    let location = this.get('model.location');
    if (Ember.isEmpty(location)) {
      this.set('showLocationMap', false);
      return false;
    } else {
      return true;
    }
  }),

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

  aSelectedClient: Ember.computed('model.client', function(){
    return this.get('model.client');
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
    },

    selectClient(client) {
      if(!Ember.isEmpty(client)){
        this.get('model').set('client', client);
      }
    },

    toggleShowLocationMap() {
      this.toggleProperty('showLocationMap');
    }
  }
});
