import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').query('user', {
      filter: {
        user_type: 'employee'
      }
    }).catch((error) => {
      console.error("Error in routes/employee: " + error);
    });
  }
});
