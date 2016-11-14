import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('service');
  },

  actions: {

    willTransition() {
      let model = this.get('controller.model');
      model.rollbackAttributes();
    },

    goBackToListOfServices() {
      this.transitionTo('services');
    },
  }
});
