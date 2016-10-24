import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

let available_services = Ember.A([{
    id: 1,
    url: '/services/1',
    name: 'Engine Degreasing',
    duration: '90',
    price_sm_car: '99',
    price_lrg_car: '99',
    description: '...'
  }, {
    id: 2,
    url: '/services/2',
    name: 'Platinum',
    duration: '150',
    price_sm_car: '159',
    price_lrg_car: '179',
    description: '...'
  }, {
    id: 3,
    url: '/services/3',
    name: 'Silver',
    duration: '90',
    price_sm_car: '79',
    price_lrg_car: '99',
    description: '...'
  }, {
    id: 4,
    url: '/services/4',
    name: 'Shampoo for Tough Stains and Spills',
    duration: '90',
    price_sm_car: '100',
    price_lrg_car: '130',
    description: '...'
  }]);

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return available_services;
  }
});
