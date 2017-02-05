// This is the controller for the index page of services

import Ember from 'ember';

export default Ember.Controller.extend({

  // Put the services in ascending by their ID
  headers: ["Name of Service", "Duration (minutes)", "Price for Small Vehicle ($)", "Price for Large Vehicle ($)",
            "Active", "Displayable"],
  attributes: {"name": "Name of Service", "duration" : "Duration (minutes):", "price_small" : "Price for Small Vehicle ($)",
               "price_large": "Price for Large Vehicle ($)", "active": "Active", "displayable": "Displayable"},

  operations: {'services.show': 'glyphicon-pencil', 'services.delete': 'glyphicon-minus'},


});
