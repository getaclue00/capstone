// This is the controller for the index page of services

import Ember from 'ember';

export default Ember.Controller.extend({

  // Put the services in ascending by their ID
  sortProperties: ['id:asc'],
  sortedServices: Ember.computed.sort('model', 'sortProperties'),

  actions: {

    handleAddNewService() {
      this.transitionToRoute('services.new');
    },

    handleEditService(service){
      this.transitionToRoute('services.show', service.id);
    },

    handleDeleteService(service){
      this.transitionToRoute('services.delete', service.id);
    }
  }
});
