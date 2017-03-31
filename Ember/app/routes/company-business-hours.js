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

  beforeModel() {
    this._super(...arguments);
    let isAdmin = this.get('currentUser.user.admin');
    if (!isAdmin) {
      this.replaceWith('my-calendar');
    }
  },

  isReadOnly(isActiveDate, date) {
    if(isActiveDate){
      Ember.$(date + '-start').attr('readonly', false);
      Ember.$(date + '-finish').attr('readonly', false);
    } else {
      Ember.$(date + '-start').attr('readonly', true);
      Ember.$(date + '-finish').attr('readonly', true);
    }
  },

  actions: {

    didTransition() {
      Ember.run.schedule('afterRender', this, () => {
        var daysOfWeek = ['#monday', '#tuesday', '#wednesday', '#thursday', '#friday', '#saturday', '#sunday'];
        for (var i = 0; i < daysOfWeek.length; i++) {
          if(!Ember.$(daysOfWeek[i]).is(":checked")){
            Ember.$(daysOfWeek[i] + '-start').attr('readonly', true);
            Ember.$(daysOfWeek[i] + '-finish').attr('readonly', true);
          }
        }
      });
    },

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
        this.isReadOnly(preferences.get('workMonday'), '#monday');
      }
    },
    toggleTuesday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workTuesday');
        this.isReadOnly(preferences.get('workTuesday'), '#tuesday');
      }
    },
    toggleWednesday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workWednesday');
        this.isReadOnly(preferences.get('workWednesday'), '#wednesday');
      }
    },
    toggleThursday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workThursday');
        this.isReadOnly(preferences.get('workThursday'), '#thursday');
      }
    },
    toggleFriday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workFriday');
        this.isReadOnly(preferences.get('workFriday'), '#friday');
      }
    },
    toggleSaturday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workSaturday');
        this.isReadOnly(preferences.get('workSaturday'), '#saturday');
      }
    },
    toggleSunday(preferences) {
      if (!Ember.isEmpty(preferences)) {
        preferences.toggleProperty('workSunday');
        this.isReadOnly(preferences.get('workSunday'), '#sunday');
      }
    }
  }
});
