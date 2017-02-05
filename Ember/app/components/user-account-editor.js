import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
	    this._super(...arguments);
	    Ember.$('.modal').modal('show');
  	},

  willDestroyElement() {
    let model = this.get('model');

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }
    Ember.$('.modal').modal('hide');
  },

  yesNoTranslationMap: {'Yes': true, 'No': false},

  actions: {

    // Used to change the selected value for user's admin attribute
    selectAdmin(value) {
      this.set('model.admin', value);
    }
  }
});
