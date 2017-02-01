import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const ServiceStub = Ember.Object.extend({
  getName() {
    return this.get('name');
  },

  getPriceSmall() {
    return this.get('price_small');
  },

  getPriceLarge() {
    return this.get('price_large');
  },

  getDuration() {
    return this.get('duration');
  },

  getDescription() {
    return this.get('description');
  },
  getActive() {
    return this.get('active');
  },
  getDisplayable() {
    return this.get('displayable');
  },

});

let service = ServiceStub.create({
  name: 'Clean Car',
  price_small: '100',
  price_large: '120',
  duration: '60',
  description: 'Cleaning the car',
  active: true,
  displayable: false,
});


moduleForComponent('confirmation-modal', 'Integration | Component | confirmation modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', service);

  this.render(hbs`{{confirmation-modal model=model type='service'}}`);

  assert.equal(this.$().text().trim(), 'Delete the following service?' + '\n  Clean Car');

});
