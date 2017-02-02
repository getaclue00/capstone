import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
  	//peekRecord gets a record by a given type and ID without triggering a fetch.
  	let employee = this.get('store').peekRecord('employee', params.employees_id);
  	return this.get('store').createRecord('user', {
  		employee: employee
  	});
  },

  actions: {
    goBackToListOfEmployees() {
      this.transitionTo('employees');
    }
  }
});



