// This is the controller for the index page of services

import Ember from 'ember';

export default Ember.Controller.extend({

  // Put the services in ascending by their ID
  headers: ["Name of Service", "Duration (minutes)", "Price", "Vehicle Size",
            "Active", "Displayable"],
  attributes: {"name": "Name of Service", "duration" : "Duration (minutes):", "price" : "Price ($)",
               "vehicle_size": "Vehicle Size", "formattedActive": "Active", "formattedDisplayable": "Displayable"},

  operations: {'services.show': 'glyphicon-pencil', 'services.delete': 'glyphicon-minus'},


});
