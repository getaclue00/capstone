import Ember from 'ember';

export default Ember.Component.extend({
  client: null,
  classNames: ['client-information-form'],
  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    verifyInformation(){
      let client = this.get('client');
      client.validate()
        .then(({validations}) => {
          if(validations.get('isValid')){
             window.location.href = "#step-4";
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
