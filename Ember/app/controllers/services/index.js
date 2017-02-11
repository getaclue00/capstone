// This is the controller for the index page of services

import Ember from 'ember';

export default Ember.Controller.extend({

  // Put the services in ascending by their ID
  headers: ["Name of Service", "Vehicle Size", "Duration (minutes)", "Price",
            "Active", "Displayable"],
  attributes: {"name": "Name of Service", "vehicle_size": "Vehicle Size:", "duration" : "Duration (minutes):", "price" : "Price ($)",
                "formattedActive": "Active", "formattedDisplayable": "Displayable"},

  operations: {'services.show': 'glyphicon-pencil', 'services.delete': 'glyphicon-minus'},


});
