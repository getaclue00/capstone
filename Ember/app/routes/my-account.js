import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;
const _this = this;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	currentuser: service('current-user'),

	model(){
		// return this.get('currentuser').user.id;

		// let id = this.get('currentUser');

		//loads model with every template render; therefore, attributes updated
		return Ember.RSVP.hash({
	      employees: this.get('store').findAll('employee'),
	      // user: this.get('store').find('user', id) SUPPOSED TO BE THIS LINE INSTEAD OF THE ONE BELOW
	      user: this.get('store').find('user', 1)
    	});
			
	}

});
