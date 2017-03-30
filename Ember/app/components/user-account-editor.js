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
    this.get('model').set('password',undefined); //needed because even if successfully set, i dont want it to be popeulated next time
    this.set('confirm',undefined); //needed to happen every time (touching confirm)
    console.log("from route***************************");
    console.log("confirm is "+this.get('confirm'));
    console.log("password is "+this.get('model').get('password'));
    Ember.$('.modal').modal('hide');
  },

  yesNoTranslationMap: {'Yes': true, 'No': false},

  actions: {

    // Used to change the selected value for user's admin attribute
    selectAdmin() {
      this.toggleProperty('model.admin');
    }
  }
});
