import Ember from 'ember';

const { inject: { service }, Controller, computed } = Ember;

export default Controller.extend({
  session:      service(),
  currentUser:  service('current-user'),

  headers: [
    "Name",
    "Employee ID",
    "Phone",
    "Start Date",
    "End Date"
  ],

  attributes: {
    "fullName": "Name",
    "id" : "Employee ID:",
    "phoneNumber" : "Phone",
    "startDate": "Start Date",
    "endDate": "End Date"
  },

  operations: computed('currentUser.user.admin', function() {
    let isAdmin = this.get('currentUser.user.admin');
    if (isAdmin) {
      return {
        'employees.show':'glyphicon-pencil',
        'employees.delete':'glyphicon-remove'
      };
    } else {
      return { };
    }
  }),

  collection: 'employees'
});
