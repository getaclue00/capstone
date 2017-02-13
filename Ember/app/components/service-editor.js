import Ember from 'ember';

export default Ember.Component.extend({
  sizes: ["Small", "Large"],

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  willDestroyElement() {
    let model = this.get('model');

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }

    Ember.$('#myModal').modal('hide');
  },

  selectedVehicleSize: Ember.computed('model.vehicle_size', function(){
    return this.get('model.vehicle_size');
  }),

  actions: {

    // Used to change the selected value for service's displayable attribute
    selectDisplayable() {
      this.toggleProperty('model.displayable');
    },
    // Used to change the selected value for service's active attribute
    selectActive() {
      this.toggleProperty('model.active');
    },

    selectVehicleSize(size) {
      if(!Ember.isEmpty(size)){
        this.get('model').set('vehicle_size', size);
      }
    }
  }
});
