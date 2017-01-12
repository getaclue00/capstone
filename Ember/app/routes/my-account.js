import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	model(){
		return Ember.RSVP.hash({
			user: this.get('store').find('user', this.get('session.data.authenticated.user_id')),
	        employees: this.get('store').findAll('employee')
    	});	
	}

});
