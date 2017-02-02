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

    Ember.$('#myModal').modal('hide');
  }

});
