import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Controller.extend(AuthenticatedRouteMixin,{


	actions: {
		updateAccountInfo() {
		    function onSuccessful() {}

		    function onError(error) {
		    	throw error.message;
		    }

		    this.get('model').get('employee').then((e) => {
	     	 	e.save().then(onSuccessful).catch(onError);
	      	});

	    },

	    updateLoginInfo() {

	    	function onSuccessful() {}

		    function onError(error) {
		    	throw error.message;
		    }
	    	
	    	if (this.get('model').get('confirm') === this.get('model').get('password')){
	    		this.get('model').save().then(onSuccessful).catch(onError);
	    	}else{
	    		console.log("Passwords dont match");
	    	}   

	    }
	    
	}
});

