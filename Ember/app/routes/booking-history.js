import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),

  beforeModel() {
    this._super(...arguments);
    let isAdmin = this.get('currentUser.user.admin');
    if (!isAdmin) { this.replaceWith('my-calendar'); }
  },

  model() {
    return this.get('store').findAll('appointment');
  }
});
