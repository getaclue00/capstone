import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('employee-editor', 'Integration | Component | employee editor', {
  integration: true
});

test('it renders default view with no model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  //number of assertions expected to run
  assert.expect(4);

  let model = Ember.Object.create({
    isAdmin: false,
    getIsAdmin() {
      return this.get('isAdmin');
    }
  });

  this.set('model', model);

  this.render(hbs`{{employee-editor model=model}}`);

  assert.equal(this.$('input[type="text"]').length, 6, 'should be 6 text fields');
  assert.equal(this.$('input[type="tel"]').length, 1, 'should be 1 telephone field');
  assert.equal(this.$('input[type="number"]').length, 1, 'should be 1 numeric field');
  assert.equal(this.$('input[type="datetime-local"]').length, 2, 'should be 2 datetime-local fields');
});
