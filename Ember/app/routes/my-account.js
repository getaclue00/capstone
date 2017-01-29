import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  model(){
    const userId = this.get('session').get('data.authenticated.user_id');
    return this.get('store').findRecord('user', userId);
  }
});
