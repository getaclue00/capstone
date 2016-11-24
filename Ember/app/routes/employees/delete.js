import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(params) {
    let id = params.employees_id;
    return this.get('store').findRecord('employee', id);
  },

  actions: {
    goBackToListOfEmployees() {
      this.transitionTo('employees');
    }
  }
});
