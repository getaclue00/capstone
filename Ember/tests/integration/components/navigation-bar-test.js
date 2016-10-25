import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startApp from '../../helpers/start-app'; //Import for allowing ember visit function
import Ember from 'ember';

// Stub for session service
const sessionStub = Ember.Service.extend({
  isAuthenticated: false,

  getIsAuthenticated() {
    return this.get('isAuthenticated');
  }
});

// Stub currentUser service
const currentUserStub = Ember.Service.extend({
  user: {
    admin: true,
    employee: true
  },

  getUser() {
    return this.get('user');
  }
});

moduleForComponent('navigation-bar', 'Integration | Component | navigation bar', {
  integration: true,

  beforeEach: function() {
    this.register('service:session', sessionStub);
    this.register('service:current-user', currentUserStub);
    this.inject.service('session', { as: 'session' });
    this.inject.service('current-user', { as: 'currentUser' });
  }
});

var App;

module('Integration Test', {
  setup: function(){
    App = startApp();
  },
  teardown: function(){
    Ember.run(App, 'destroy');
  }
});

test('Should redirect to Login page.' , function (assert) {
  visit('/');
  click('a:contains("Login")');
  andThen(function () {
    assert.equal(currentURL(), '/login', 'should navigate to Login page.');
  });
});

test('Should redirect to root path after login' , function (assert) {
  visit('/login');
  fillIn('#inputEmail', 'test@test.com');
  fillIn('#inputPassword', 'password');
  click('.login-button');
  andThen(function () {
    assert.equal(currentURL(), '/login', 'should navigate to root path.');
  });
});

test('Should redirect to Administrator\'\ s home.' , function (assert) {
  visit('/');
  click('a:contains("Home")');
  andThen(function () {
    assert.equal(currentURL(), '/admin-home', 'should navigate to administrator\'\ s homepage.');
  });
});

test('Should redirect to Administrator\'\ s calendar.', function (assert) {
  visit('/');
  click('a:contains("My Calendar")');
  andThen(function () {
    assert.equal(currentURL(), '/my-calendar', 'should navigate to administrator\'\ s calendar.');
  });
});

test('Should redirect to Administrator\'\ s manage account information.', function (assert) {
  visit('/');
  click('a:contains("My Account")');
  andThen(function () {
    assert.equal(currentURL(), '/my-account', 'should navigate to administrator\'\ s account information.');
  });
});

test('Should redirect to Administrator\'\ s manage services page.', function (assert) {
  visit('/');
  click('a:contains("Services")');
  andThen(function () {
    assert.equal(currentURL(), '/services', 'should navigate to administrator\'\ s manage services page.');
  });
});

test('Should redirect to Administrator\'\ s manage clients page.', function (assert) {
  visit('/');
  click('a:contains("Clients")');
  andThen(function () {
    assert.equal(currentURL(), '/clients', 'should navigate to administrator\'\ s manage clients page.');
  });
});

test('Should redirect to Administrator\'\ s manage employees page.', function (assert) {
  visit('/');
  click('a:contains("Employees")');
  andThen(function () {
    assert.equal(currentURL(), '/employees', 'should navigate to administrator\'\ s manage employees page.');
  });
});
