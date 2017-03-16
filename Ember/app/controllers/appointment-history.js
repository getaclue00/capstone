import Ember from 'ember';

export default Ember.Controller.extend({
  headers: ["Service", "Employee", "Client",
            "Start Time", "End Time", "Cost", "Location", "Status", "Notes"],
  attributes: {"service.name": "Service", "employee.fullName" : "Employee", "client.fullName" : "Client",
                "formattedStart": "Start Time", "formattedEnd": "End Time", "cost": "Cost", "location": "Location",
                "status": "Status", "notes": "Notes"},

  operations: {},

  collection: 'appointments'
});
