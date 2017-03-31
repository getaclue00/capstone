// This is the controller for the index page of services

import Ember from 'ember';

const { Controller, inject: { service }, computed } = Ember;

export default Controller.extend({

  session:      service(),
  currentUser:  service('current-user'),

  // Put the services in ascending by their ID
  headers: [
    "Name of Service",
    "Duration (minutes)",
    "Price",
    "Active",
    "Displayable"
  ],

  attributes: {
    "name": "Name of Service",
    "duration" : "Duration (minutes):",
    "price" : "Price ($)",
    "formattedActive": "Active",
    "formattedDisplayable": "Displayable"
  },

  // operations: {
  //   'services.show': 'glyphicon-pencil',
  //   'services.delete': 'glyphicon-remove'
  // },

  operations: computed('currentUser.user.admin', function () {
    let isAdmin = this.get('currentUser.user.admin');
    if (isAdmin) {
      return {
        'services.show':'glyphicon-pencil',
        'services.delete':'glyphicon-remove'
      };
    } else {
      return { };
    }
  }),

  collection: 'services'
});
