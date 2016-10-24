import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    console.warn('params are not implemented yet, service_id: ${params.service_id}');
    return this.get('store').findRecord('service', params.service_id);
  },

  actions: {
    goBackToListOfServices() {
      this.transitionTo('services');
    },

    deleteService() {
      console.warn('deleteService is not implemented');
    }
  }
});
