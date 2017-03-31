import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Controller.extend(AuthenticatedRouteMixin,{
  flashMessages:  Ember.inject.service(),
  session:        Ember.inject.service(),
  currentUser:    Ember.inject.service('current-user'),

  actions: {
    updateAccountInfo() {
      var flashMessages = this.get('flashMessages');

      function onSuccessful() {
        window.scrollTo(0,0);
        flashMessages.success('Successfully saved!');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger("Account information was not saved");
      }

      this.get('model').get('employee').then((e) => {
        e.save().then(onSuccessful).catch(onError);
       });
     },

    updateLoginInfo() {
      var flashMessages = this.get('flashMessages');

      function onSuccessful() {
        window.scrollTo(0,0);
        flashMessages.success('Password successfully changed!');
      }

      function onError() {
        window.scrollTo(0,0);
        flashMessages.danger('Password not successfully changed');
      }

      if (this.get('model').get('confirm') === this.get('model').get('password')) {
        this.get('model').save().then(onSuccessful).catch(onError);
      } else {
        window.scrollTo(0,0);
        flashMessages.danger("Passwords do not match");
      }
    }
  }
});
