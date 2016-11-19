import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    Ember.$('#employee-editor').modal('show');
  },

  willDestroyElement() {
    let model = this.get('model');

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }

    Ember.$('#employee-editor').modal('hide');
  }
});
