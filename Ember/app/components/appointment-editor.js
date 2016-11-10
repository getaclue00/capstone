import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectService(service, model) {
      if(!Ember.isEmpty(service)){
        model.set('service', service);
      }
    }
  }
});
