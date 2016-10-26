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
    verified: true
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
  assert.expect(11);
  this.render(hbs`{{navigation-bar session=this.session currentUser=currentUser }}`);

  // Number of clickable links
  assert.equal(this.$('.nav-item').length, 6, 'should be only 6 clickable link in main menu');
  assert.equal(this.$('.dropdown-item').length, 3, 'should be only 3 clickable link in sub menu');

  // Name of main nav menu links
  assert.equal(this.$('.nav-list-item')[0].text, 'Home', 'Navigation option is Home');
  assert.equal(this.$('.nav-list-item')[1].text, 'Manage', 'Navigation option is Manage');
  assert.equal(this.$('.nav-list-item')[2].text, 'Appointment History', 'Navigation option is Appointment History'); //Will fail until Rename booking to appointment branch is merged
  assert.equal(this.$('.nav-list-item')[3].text, 'My Calendar', 'Navigation option is My Calendar');
  assert.equal(this.$('.nav-list-item')[4].text, 'My Account', 'Navigation option is My Account');
  assert.equal(this.$('.nav-list-item')[5].firstChild.nodeValue, 'Logout', 'Navigation option is Logout');

  // Name of sub nav menu links
  assert.equal(this.$('.dropdown-item')[0].text, 'Services', 'Navigation option is Services');
  assert.equal(this.$('.dropdown-item')[1].text, 'Clients', 'Navigation option is Clients');
  assert.equal(this.$('.dropdown-item')[2].text, 'Employees', 'Navigation option is Employees');
});

