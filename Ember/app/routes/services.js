import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let available_services = Ember.A([{
    id: 1,
    url: '/services/1',
    name: 'Engine Degreasing',
    duration: '90',
    price_small: '99',
    price_large: '99',
    description: '...'
  }, {
    id: 2,
    url: '/services/2',
    name: 'Platinum',
    duration: '150',
    price_small: '159',
    price_large: '179',
    description: '...'
  }, {
    id: 3,
    url: '/services/3',
    name: 'Silver',
    duration: '90',
    price_small: '79',
    price_large: '99',
    description: '...'
  }, {
    id: 4,
    url: '/services/4',
    name: 'Shampoo for Tough Stains and Spills',
    duration: '90',
    price_small: '100',
    price_large: '130',
    description: '...'
  }]);

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return available_services;
  }
});
