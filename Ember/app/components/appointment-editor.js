import Ember from 'ember';

export default Ember.Component.extend({

  selectedService: undefined,
  selectedServiceStatement: Ember.computed('selectedService', function() {
    if(Ember.isEmpty(this.get('selectedService'))){
      return 'None';
    } else {
      return this.get('selectedService.name');
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectService(service, model) {
      if(!Ember.isEmpty(service)){
        model.set('service', service);
        this.set('selectedService', service);
      }
    }
  }
});
