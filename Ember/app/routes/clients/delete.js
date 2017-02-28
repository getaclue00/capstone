import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(params) {
    let id = params.clients_id;
    return this.get('store').findRecord('client', id);
  },

  actions: {
    goBackToListOfClients() {
      this.transitionTo('clients');
    }
  }
});
