import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let data = Ember.Object.create({
  showMonday: true,
  mondayOpen: '08:00:00',
  mondayClose: '17:00:00',
  showTuesday: false,
  tuesdayOpen: '08:00:00',
  tuesdayClose: '17:00:00',
  showWednesday: false,
  wednesdayOpen: '08:00:00',
  wednesdayClose: '17:00:00',
  showThursday: false,
  thursdayOpen: '08:00:00',
  thursdayClose: '17:00:00',
  showFriday: false,
  fridayOpen: '08:00:00',
  fridayClose: '17:00:00',
  showSaturday: false,
  saturdayOpen: '08:00:00',
  saturdayClose: '17:00:00',
  showSunday: true,
  sundayOpen: '08:00:00',
  sundayClose: '17:00:00',
});

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
        flashMessages.success('Schedule was updated');
      }).catch(() => {
        window.scroll(0, 0);
        flashMessages.danger('Schedule was not updated');
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
