import Ember from 'ember';

export default Ember.Controller.extend({
	flashMessages: Ember.inject.service(),
	actions: {

	    updateClient() {
	    	var flashMessages = this.get('flashMessages');
	      	var self = this;

	      	function onSuccessful() {
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

	      	this.get('model').save().then(onSuccessful).catch(onError);
	    }
  	}
});
