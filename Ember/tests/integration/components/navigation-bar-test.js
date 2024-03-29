import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
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

  assert.deepEqual(this.$('.nav-item').length, 2, 'should have 2 nav items; logo and login link');
  assert.deepEqual(this.$('.nav-list-item').text().trim(), 'Login', 'Navigation option is Login');
});

test('it renders administrator\' s navigation bar', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.login();
  assert.expect(7);
  this.render(hbs`{{navigation-bar session=this.session currentUser=currentUser }}`);

  // Number of clickable links
  assert.equal(this.$('.nav-item').length, 10, 'should have 11 nav-item items');

  // Name of main nav menu links
  assert.deepEqual(this.$('.nav-list-item')[0].text, ' Schedule');
  assert.deepEqual(this.$('.nav-list-item')[1].text, ' Booking History');
  assert.deepEqual(this.$('.nav-list-item')[2].text, ' Clients');
  assert.deepEqual(this.$('.nav-list-item')[3].text, ' Staff');
  assert.deepEqual(this.$('.nav-list-item')[4].text, ' Services');
  assert.deepEqual(this.$('.nav-list-item')[5].text, ' Settings');
});
