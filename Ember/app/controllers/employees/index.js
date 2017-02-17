import Ember from 'ember';

export default Ember.Controller.extend({
  headers: ["Name", "Employee ID", "Phone",
            "Start Date", "End Date"],
  attributes: {"fullName": "Name", "id" : "Employee ID:", "phoneNumber" : "Phone",
                "startDate": "Start Date", "endDate": "End Date"},

  operations: {'employees.show': 'glyphicon-pencil', 'employees.delete': 'glyphicon-remove'},

  collection: 'employees'
});
