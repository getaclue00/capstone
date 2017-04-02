import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),

  headers: [
    "Name",
    "Client ID",
    "Email",
    "Phone"
  ],

  attributes: {
    "fullName": "Name",
    "id" : "Client ID:",
    "email": "Email",
    "phoneNumber" : "Phone"
  },

  // operations: {
  //   'clients.show': 'glyphicon-pencil',
  //   'clients.delete': 'glyphicon-remove'
  // },

  operations: Ember.computed('currentUser.user.admin', function() {
    let isAdmin = this.get('currentUser.user.admin');
    if (isAdmin) {
      return {
        'clients.show': 'glyphicon-pencil',
        'clients.delete': 'glyphicon-remove'
      };
    } else {
      return {
        'clients.show': 'glyphicon-pencil'
      };
    }
  }),

  collection: 'clients'
});
