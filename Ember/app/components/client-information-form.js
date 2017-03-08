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
          console.log(validations.get('isValid'));
          if(validations.get('isValid')){
             window.location.href = "#step-4";
          } else {

          }
      });
    }
  }
});
