import Ember from 'ember';

export default Ember.Component.extend({

  yesNoTranslationMap: {'Yes': true, 'No': false},
  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {

    // Used to change the selected value for service's displayable attribute
    selectDisplayable(value) {
      this.set('model.displayable', value);
    },
    // Used to change the selected value for service's active attribute
    selectActive(value) {
      this.set('model.active', value);
    }
  }
});
