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
	        	window.scrollTo(0,0);
        		flashMessages.danger("Client was not successfully updated");
	      	}

	      	this.get('model').save().then(onSuccessful).catch(onError);
	    }
  	}
});