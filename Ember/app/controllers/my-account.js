import Ember from 'ember';


export default Ember.Controller.extend({

	actions: {
		updateAccount() {
		    function onSuccessful() {}

		    function onError(error) {
		    	throw error.message;
		    }

		    this.get('model').save().then(onSuccessful).catch(onError);
		    this.get('model').get('employee').then((e) => {
	     	 	e.save().then(onSuccessful).catch(onError);
	      	});



	    } 
	}
});
