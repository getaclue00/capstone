import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('employee');
  },

  actions: {
  	goBackToListOfEmployees() {
      this.get('controller.model').destroyRecord();
  	  this.transitionTo('employees');
  	}
  }
});
