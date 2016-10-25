import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('service');
  },

  actions: {
    goBackToListOfServices() {
      this.transitionTo('services');
    },

    submitService() {
      var newService = this.get('currentModel');
      newService.save();
      this.transitionToRoute('services');
      window.location.reload(true);
    }
  }
});
