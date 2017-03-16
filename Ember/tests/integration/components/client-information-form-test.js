import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('client-information-form', 'Integration | Component | client information form', {
  integration: true
});

test('it renders', function(assert) {

  assert.expect(2);

   this.render(hbs`{{client-information-form}}`);
  // Test in correct inputs bar are present
  assert.deepEqual(this.$('input[type="tel"]').length, 1, 'should be only 1 input tel field for phoneNumber');
  assert.deepEqual(this.$('input[type="text"]').length, 7, 'should be only 1 text area for the notes');
});
