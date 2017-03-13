import Ember from 'ember';

export default Ember.Component.extend({
  client: null,
  classNames: ['client-information-form'],
  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    moveToPreviousPage(){
      Ember.$('#step-3').hide();
      Ember.$('#li-3').removeClass('active');
      Ember.$('#step-2').show();
      Ember.$('#li-2').addClass('active');
    },

    verifyInformation(){
      let client = this.get('client');
      client.validate()
        .then(({validations}) => {
          if(validations.get('isValid')){
            Ember.$('#step-3').hide();
            Ember.$('#li-3').addClass('done');
            Ember.$('#li-3').removeClass('active');
            Ember.$('#step-4').show();
            Ember.$('#li-4').addClass('active');
          } else {
             this.set('showFirstNameError', true);
             this.set('showLastNameError', true);
             this.set('showEmailError', true);
             this.set('showPhoneError', true);
             this.set('showStreetError', true);
             this.set('showCityError', true);
             this.set('showProvinceError', true);
             this.set('showPostalCodeError', true);
          }
      });
    }
  }
});
