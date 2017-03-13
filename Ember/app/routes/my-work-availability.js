import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session:     Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  model() {
    let employee = this.get('currentUser.user.employee').then(function (result){
      return result.get('companyPreference');
    });
    return employee;
  },

  actions: {
    toggleMonday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workMonday');
      }
    },
    toggleTuesday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workTuesday');
      }
    },
    toggleWednesday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workWednesday');
      }
    },
    toggleThursday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workThursday');
      }
    },
    toggleFriday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workFriday');
      }
    },
    toggleSaturday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workSaturday');
      }
    },
    toggleSunday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workSunday');
      }
    }
  }
});
