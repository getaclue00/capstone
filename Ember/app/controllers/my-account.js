import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Controller.extend(AuthenticatedRouteMixin,{
  flashMessages: Ember.inject.service(),

	actions: {
		updateAccountInfo() {

      var flashMessages = this.get('flashMessages');

		    function onSuccessful() {
          window.scrollTo(0,0);
          flashMessages.success('Successfully saved!');
        }

		    function onError(error) {
          window.scrollTo(0,0);
          flashMessages.danger("Account information was not saved");
		    	throw error.message;
		    }

		    this.get('model').get('employee').then((e) => {
	     	 	e.save().then(onSuccessful).catch(onError);
	      	});

	    },

    updateLoginInfo() {
      var flashMessages = Ember.get(this, 'flashMessages');

    	function onSuccessful() {
        flashMessages.success('Password successfully changed!');
      }

	    function onError(error) {
	    	throw error.message;
	    }

    	if (this.get('model').get('confirm') === this.get('model').get('password')){
    		this.get('model').save().then(onSuccessful).catch(onError);
    	}else{
        window.scrollTo(0,0);
        flashMessages.danger("Passwords do not match!");
    		console.log("Passwords dont match");
    	}

    }
	}
});

