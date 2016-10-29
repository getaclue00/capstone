import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(6);

  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('h2').text().trim(), 'Please sign in');
  assert.equal(this.$('input[type="text"]').attr('placeholder').trim(), 'Email address');
  assert.equal(this.$('input[type="password"]').attr('placeholder').trim(), 'Password');
  assert.equal(this.$('input[type="checkbox"]').length, 1, 'Remember Me checkbox');
  assert.equal(this.$('button').length, 1, 'Only one button - Sign In');
  assert.equal(this.$('button').text().trim(), 'Sign in');
});
