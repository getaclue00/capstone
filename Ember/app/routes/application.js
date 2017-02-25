import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

// const { $ } = Ember;
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  renderTemplate(controller, model) {
    this._super(controller, model);
  },

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
});
