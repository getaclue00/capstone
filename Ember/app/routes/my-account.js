import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	model(){
		return this.get('store').find('user', this.get('session.data.authenticated.user_id'));
	}

});

Ember.Route.reopen({
  activate: function() {
    var cssClass = this.toCssClass();
    console.log(cssClass);
    if (cssClass !== 'application') {
      Ember.$('body').addClass(cssClass);
    }
  },
  deactivate: function() {
    Ember.$('body').removeClass(this.toCssClass());
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});
