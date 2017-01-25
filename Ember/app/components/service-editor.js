import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  willDestroyElement() {
    let model = this.get('model');

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }

    Ember.$('#service-editor').modal('hide');
  },

  yesNoTranslationMap: {'Yes': true, 'No': false},

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
