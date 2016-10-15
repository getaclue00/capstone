import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin-home');
  this.route('booking-history');
  this.route('my-calendar');
  this.route('my-account');
  this.route('services');
  this.route('clients');
  this.route('employees');
  this.route('login');
});

export default Router;
