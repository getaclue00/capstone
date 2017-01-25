import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let id = params.users_id;
    return this.get('store').findRecord('user', id);
  },

  actions: {
    goBackToListOfEmployees() {
      this.transitionTo('employees');
    }
  }
});