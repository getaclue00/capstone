import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let id = params.services_id;
    return this.get('store').findRecord('service', id);
  },

  actions: {
    goBackToListOfServices() {
      this.transitionTo('services');
    },

    updateService() {
      var model = this.controller.get('model');
      console.log(model);
      model.get();
      model.set({ name: 'hi'});
      model.save();
      this.transitionTo('services');
      window.location.reload(true);
    }
  }
});
