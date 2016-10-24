import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {

    let available_services = [];

    this.get('store').findAll('service').then((items) => {
      items.forEach((item) => {
        available_services.pushObject({
          id    : item.get('id'),
          name : item.get('name'),
          price_small : item.get('price_small'),
          price_large   : item.get('price_large'),
          duration : item.get('duration'),
          description: item.get('description')
        });
      });
    });

    return available_services;
  }
});
