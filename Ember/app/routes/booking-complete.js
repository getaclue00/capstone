import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    didTransition() {
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#navigation-menu').hide();
      });
    }
  }
});
