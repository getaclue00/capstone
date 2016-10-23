import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

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

//Used to toggle the nav bar closed when nav-item is clicked
$(document).on('click','.collapse.in',function(e) {
  if($(e.target).is('a') && ( $(e.target).attr('class') !== 'dropdown' ) ) {
     $(this).collapse('hide');
});
