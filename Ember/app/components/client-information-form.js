import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    verifyInformation(){
      var isValid = true;
      Ember.$('input').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
      });

      if(isValid){
         Ember.$('#move-to-confirmation').removeAttr('disabled');
      }
    }
  }
});
