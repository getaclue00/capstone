import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const UserStub = Ember.Object.extend({
  getEmail() {
    return this.get('email');
  },

  getPassword() {
    return this.get('password');
  },

  getAdmin() {
    return this.get('admin');
  }

});

let user = UserStub.create({
  email: 'test@test.com',
  password: 'blabla',
  admin: true
});

moduleForComponent('user-account-editor-editor', 'Integration | Component | user account editor', {
  integration: true
});

test('it renders a view with a model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', user);

  assert.expect(7);
  this.set('confirm', '');
  this.render(hbs`{{
    user-account-editor
    model=model
    confirm=confirm
  }}`);

  // // Test in correct inputs bar are present
  assert.deepEqual(this.$('input[type="password"]').length, 2, 'should be only 2 input password field - new and confirm password');
  assert.deepEqual(this.$('input[id="user-admin"]').length, 1, 'should be only 1 input switch for user admin');
  assert.deepEqual(this.$('input[type="text"]').length, 2, 'should be only 2 input name field - email and employee id');

  // Test if proper values are placed into form
  assert.deepEqual(this.$('input[type="text"]')[1].value, this.get('model.email'), 'names should match');
  assert.deepEqual(this.$('input[id="user-admin"]').is(":checked"), this.get('model.admin'), 'Whether a user is admin should match');
  assert.deepEqual(this.$('input[type="password"]')[0].value, this.get('model.password').toString(), 'password should match');
  assert.deepEqual(this.$('input[type="password"]')[1].value, this.get('confirm'), '');
});

test('should update user admin on click', function(assert) {
  this.set('model', user);
  assert.expect(2);

  this.render(hbs`{{
    user-account-editor
    model=model
  }}`);

  assert.equal(this.$('input[id="user-admin"]').is(":checked"), this.get('model.admin'), 'Whether a user is admin should match');
  this.$('div#admin-switch')[0].click();
  assert.equal(this.$('input[id="user-admin"]').is(":checked"), !!(this.get('model.admin')), 'Whether a user is admin should match');
});
