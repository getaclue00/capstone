// This is the controller for the index page of services

import Ember from 'ember';

export default Ember.Controller.extend({

  // Put the services in ascending by their ID
  sortProperties: ['id:asc'],
  sortedServices: Ember.computed.sort('model', 'sortProperties'),
  headers: ["Name of Service", "Duration (minutes)", "Price for Small Vehicle ($)", "Price for Large Vehicle ($)",
            "Active", "Displayable"],
  attributes: ["name", "duration", "price_small", "price_large", "active", "displayable"],

  actions: {

    handleAddNewService() {
      this.transitionToRoute('services.new');
    }
  }
});
