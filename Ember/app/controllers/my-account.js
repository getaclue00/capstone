import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Controller.extend(AuthenticatedRouteMixin,{
  flashMessages:  Ember.inject.service(),
  session:        Ember.inject.service(),
  currentUser:    Ember.inject.service('current-user'),

  actions: {
    updateAccountInfo() {
      var self = this;
      var flashMessages = self.get('flashMessages');

      function onSuccessful() {
        window.scrollTo(0,0);
        flashMessages.success('Successfully saved!');
      }

      function onError() {
        window.scrollTo(0,0);
        var message = "";
        self.get('model').get('employee').then((e) => {
          var errors = e.get('errors.content');
          for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
          flashMessages.danger('Error: '+ message);
        });

      }

      self.get('model').get('employee').then((e) => {
        e.save().then(onSuccessful).catch(onError);
       });
     },

    updateLoginInfo() {
      var self=this;
      var flashMessages = self.get('flashMessages');

      function onSuccessful() {
        window.scrollTo(0,0);
        flashMessages.success('Password successfully changed!');
      }

      function onError() {
        window.scrollTo(0,0);
        var message = "";
        var errors = self.get('model').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

      if (self.get('model').get('confirm') === self.get('model').get('password')) {
        self.get('model').save().then(onSuccessful).catch(onError);
      } else {
        window.scrollTo(0,0);
        flashMessages.danger("Error: passwords do not match");
      }
    }
  }
});
