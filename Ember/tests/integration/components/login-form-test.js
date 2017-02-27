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

  assert.deepEqual(this.$('h2').text().trim(), 'Login');
  assert.deepEqual(this.$('input[type="text"]').attr('placeholder'), undefined);
  assert.deepEqual(this.$('input[type="password"]').attr('placeholder'), undefined);
  assert.deepEqual(this.$('input[type="checkbox"]').length, 1, 'Remember Me checkbox');
  assert.deepEqual(this.$('button').length, 1, 'Only one button - Sign In');
  assert.deepEqual(this.$('button').text().trim(), 'SIGN IN');
});
