import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin-home');
  this.route('my-calendar', function() {
    this.route('appointments', function() {
      this.route('new');
      this.route('show', { path: "/:appointments_id" });
    });
  });
  this.route('my-account');
  this.route('services', function() {
    this.route('new');
    this.route('show', { path: "/:services_id" });
    this.route('delete', { path: "/delete/:services_id" });
  });
  this.route('clients', function() {
    this.route('new');
    this.route('show', { path: "/:clients_id" });
    this.route('delete', { path: "/delete/:clients_id" });
  });
  this.route('employees', function() {
    this.route('new');
    this.route('show', { path: "/:employees_id" });
    this.route('delete', { path: "/delete/:employees_id" });
  });
  this.route('login');
  this.route('appointment-history');
  this.route('users', function() {
    this.route('show', { path: "/:users_id" });
    this.route('new', { path: "/:employees_id" });
    this.route('delete', { path: "/delete/:users_id" });
  });
  this.route('book-an-appointment');
  this.route('booking-complete', function() {
    this.route('show', { path: "/:appointments_id" });
  });
  this.route('my-work-availability');
  this.route('company-business-hours');
});

export default Router;
