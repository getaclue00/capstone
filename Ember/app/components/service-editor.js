import Ember from 'ember';

export default Ember.Component.extend({
  sizes: ["small", "large"],

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
    selectDisplayable(value) {
      var displayable = (value ? false : true);
      this.set('model.displayable', displayable);
    },
    // Used to change the selected value for service's active attribute
    selectActive(value) {
      var active = (value ? false : true);
      this.set('model.active', active);
    },

    selectVehicleSize(size) {
      if(!Ember.isEmpty(size)){
        this.get('model').set('vehicle_size', size);
      }
    }
  }
});
