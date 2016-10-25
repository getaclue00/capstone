import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(service) {
    console.warn('params are not implemented yet, service_id: ${params.service_id}');
    return this.get('store').findRecord('service', service.id);
  },

  actions: {
    goBackToListOfServices() {
      this.transitionTo('services');
    },

    deleteService() {
      var service = this.controller.get('model');
      console.log(service);
      service.destroyRecord().then(function() {
        this.transitionTo('services');
      }, function(error) {
        console.error(error);
      });
      window.location.reload(true);
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
