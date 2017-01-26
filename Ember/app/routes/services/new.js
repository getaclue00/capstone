import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('service');
  },

  actions: {

    //NOT NEEDED SINCE WILLDESTROYELEMENT WAS OVERRIDEN IN SERVICE-EDITOR COMPONENT
    // willTransition() {
    //   let model = this.get('controller.model');
    //   model.rollbackAttributes();
    // },

    goBackToListOfServices() {
      this.transitionTo('services');
    }
  }
});
