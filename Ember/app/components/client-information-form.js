import Ember from 'ember';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),
  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    verifyInformation(){
      var flashMessages = this.get('flashMessages');
      var isValid = true;
      Ember.$('input').each(function() {
        if (Ember.$(this).val() === ''){
            isValid = false;
            flashMessages.danger("Please Enter Your " + Ember.$(this)[0].name);
          }
        });

      if(isValid){
         Ember.$('#move-to-confirmation').removeAttr('disabled');
         flashMessages.success("Information entered correctly");
      }
    }
  }
});
