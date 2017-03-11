import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let data = Ember.Object.create({
  showMonday: false,
  mondayOpen: '08:00:00',
  mondayClose: '17:00:00',
  showTuesday: true,
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
  showSaturday: true,
  saturdayOpen: '08:00:00',
  saturdayClose: '17:00:00',
  showSunday: false,
  sundayOpen: '08:00:00',
  sundayClose: '17:00:00',
});

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return data;
  }
});
