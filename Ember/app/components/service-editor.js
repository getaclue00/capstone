import Ember from 'ember';

export default Ember.Component.extend({

  yesNoTranslationMap: {'Yes': true, 'No': false},
  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectDisplayable(value, component) {
      this.set('model.displayable', value);
    },

    selectActive(value, component) {
      this.set('model.active', value);
    }
  }
});
