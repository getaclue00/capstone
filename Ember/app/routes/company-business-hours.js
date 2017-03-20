import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session:        Ember.inject.service('session'),
  currentUser:    Ember.inject.service('current-user'),
  flashMessages:  Ember.inject.service(),

  model() {
    var store = this.get('store');
    return this.get('currentUser.user.employee').then(function (result){
      return store.findRecord('company', result.get('company.id'));
    });
  },

  actions: {
    saveCompanyPreference() {
      var flashMessages = this.get('flashMessages');
      let model = this.get('controller.model');
      model.save().then(() => {
        window.scroll(0, 0);
        flashMessages.success('Business hours were updated');
      }).catch(() => {
        window.scroll(0, 0);
        flashMessages.danger('Business hours were not updated');
      });
    },

    goBackToSettings() {
      let model = this.get('controller.model');
      if (model.get('hasDirtyAttributes')) {
        model.rollbackAttributes();
      }
      this.transitionTo('my-account');
    },

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
