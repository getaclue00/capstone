import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// Stub for session service
const sessionStub = Ember.Service.extend({
  isAuthenticated: true,

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

  login : function() {
    this.register('service:session', sessionStub);
    this.register('service:current-user', currentUserStub);
    this.inject.service('session', { as: 'session' });
    this.inject.service('current-user', { as: 'currentUser' });
  }
});

test('it renders employee login bar', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(2);

  this.render(hbs`{{navigation-bar}}`);

  assert.equal(this.$('.nav-item').length, 1, 'should be only 1 clickable link');
  assert.equal(this.$('.nav-list-item').text(), 'Login', 'Navigation option is Login');
});

test('it renders administrator\' s navigation bar', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.login();
  debugger;
  assert.expect(2);
  this.render(hbs`{{navigation-bar}}`);

  assert.equal(this.$('.nav-item').length, 6, 'should be only 6 clickable link');
  assert.equal(this.$('.nav-list-item').text(), 'Login', 'start times should match');
});

