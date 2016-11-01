import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('employee-editor', 'Integration | Component | employee editor', {
  integration: true
});

test('it renders default view with no model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(5);

  this.render(hbs`{{employee-editor}}`);

  assert.equal(this.$('input[type="text"]').length, 6, 'should be 6 text fields');
  assert.equal(this.$('input[type="email"]').length, 1, 'should be 1 email field');
  assert.equal(this.$('input[type="tel"]').length, 1, 'should be 1 telephone field');
  assert.equal(this.$('input[type="number"]').length, 1, 'should be 1 numeric field');
  assert.equal(this.$('input[type="datetime-local"]').length, 1, 'should be 1 datetime-local field');
});
