import Ember from 'ember';

export default Ember.Controller.extend({
  headers: ["Service", "Employee", "Client",
            "Start Time", "End Time", "Cost", "Location", "Status", "Notes"],
  attributes: {"service.name": "Service", "employee.last_name" : "Employee", "client.last_name" : "Client",
                "start": "Start Time", "end": "End Time", "cost": "Cost", "location": "Location",
                "status": "Status", "notes": "Notes"},

  operations: {},

  collection: 'appointments'
});
