import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let events = Ember.A([{
    id: 1,
    color: '#AB00FF',
    textColor: '#FFFFFF',
    title: 'Event 1',
    start: '2016-10-17T07:08:08',
    end: '2016-10-18T09:08:08'
  }, {
    id: 2,
    color: '#AB00FF',
    textColor: '#FFFFFF',
    title: 'Meeting',
    start: '2016-10-17T18:00:00',
    end: '2016-10-17T19:00:00'
  }, {
    id: 3,
    color: '#AB00FF',
    textColor: '#FFFFFF',
    title: 'Event 3',
    start: '2016-10-19T18:00:00',
    end: '2016-10-19T19:00:00'
  }, {
    id: 4,
    color: 'yellow',
    textColor: 'black',
    title: 'Event 4',
    start: '2016-10-22T18:00:00',
    end: '2016-10-22T19:00:00'
  }]);

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return events;
  }
});
