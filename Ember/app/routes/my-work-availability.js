import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('companyPreferences');
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
