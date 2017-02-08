import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('appointment-time-selection', 'Integration | Component | appointment time selection', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{appointment-time-selection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#appointment-time-selection}}
      template block text
    {{/appointment-time-selection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
