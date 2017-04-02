import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

	actions: {
    // Action for saving a new client
    saveClient() {
      var flashMessages = this.get('flashMessages');

      let client = this.get('model');

      var self = this;

      function transitionToPost() {
        self.transitionToRoute('clients');
      }

      function onError() {
        Ember.$('.modal').scrollTop(0);
        var message = "";
        var errors = self.get('model').get('errors.content');
        for (var i=0; i<errors.length; ++i){
            message +=(errors[i].attribute+" "+ errors[i].message+"! ");}
        flashMessages.danger('Error: '+ message);
      }

      client.save().then(transitionToPost).catch(onError);
    }
  }
});
