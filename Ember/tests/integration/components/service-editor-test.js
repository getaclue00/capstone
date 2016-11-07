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

});

moduleForComponent('service-editor', 'Integration | Component | service editor', {
  integration: true
});

test('it renders default view', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(4);

  this.render(hbs`{{service-editor}}`);

  assert.equal(this.$('input[type="name"]').length, 1, 'should be only 1 input name field - name of service');
  assert.equal(this.$('input[type="number-minutes"]').length, 1, 'should be only 1 input number-minutes - Duration');
  assert.equal(this.$('input[type="dollar-amount"]').length, 2, 'should be only 2 input dollar-amount for price of large and small cars');
  assert.equal(this.$('textarea').length, 1, 'should be only 1 text area for the description');
});

test('it renders a view with a model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let service = ServiceStub.create({
    name: 'Clean Car',
    price_small: '100',
    price_large: '120',
    duration: '60',
    description: 'Cleaning the car',
  });

  this.set('model', service);

  assert.expect(5);

  this.render(hbs`{{
    service-editor
    model=model
  }}`);

  assert.equal(this.$('input[type="name"]').val(), this.get('model.name'), 'names should match');
  assert.equal(this.$('input[type="number-minutes"]').val(), this.get('model.duration'), 'duration should match');
  assert.equal(this.$('input[type="dollar-amount"]')[0].value, this.get('model.price_small'), 'price for small car should watch');
  assert.equal(this.$('input[type="dollar-amount"]')[1].value, this.get('model.price_large'), 'price for large car  should match');
  assert.equal(this.$('textarea').val(), this.get('model.description'), 'the textarea should be filled in with the model description');
});
