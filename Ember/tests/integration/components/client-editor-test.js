import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

// moduleForComponent('client-editor', 'Integration | Component | client editor', {
//   integration: true
// });

// test('it renders', function(assert) {

//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });

//   this.render(hbs`{{client-editor}}`);

//   assert.equal(this.$().text().trim(), '');

//   // Template block usage:
//   this.render(hbs`
//     {{#client-editor}}
//       template block text
//     {{/client-editor}}
//   `);

//   assert.equal(this.$().text().trim(), 'template block text');
// });


const EmployeeStub = Ember.Object.extend({
  getFirstName() {
    return this.get('firstName');
  },

  getLastName() {
    return this.get('lastName');
  },

  getEmail() {
    return this.get('email');
  },

  getPhoneNumber() {
    return this.get('phoneNumber');
  },

  getStreet() {
    return this.get('street');
  },

  getCity() {
    return this.get('city');
  },

  getProvice() {
    return this.get('province');
  },

  getPostalCode() {
    return this.get('postalCode');
  }

});

let employee = EmployeeStub.create({
  firstName: 'Bruce',
  lastName: 'Wayne',
  email: 'testing@test.com',
  phoneNumber: '111-111-1111',
  street: '45 Bank Street',
  city: 'Ottawa',
  province: 'Ontario',
  postalCode: 'T5T 3Y3'
});

moduleForComponent('client-editor', 'Integration | Component | client editor', {
  integration: true
});

test('it renders a view with a model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', employee);

  assert.expect(10);

  this.render(hbs`{{
    client-editor
    model=model
  }}`);

  // Test in correct inputs bar are present
  assert.deepEqual(this.$('input[type="tel"]').length, 1, 'should be only 1 input tel field for phoneNumber');
  assert.deepEqual(this.$('input[type="text"]').length, 7, 'should be only 7 text inputs for the client information');

  // Test if proper values are placed into form
  assert.deepEqual(this.$('input[id="client-first-name"]').val(), this.get('model.firstName'), 'firstNames should match');
  assert.deepEqual(this.$('input[id="client-last-name"]').val(), this.get('model.lastName'), 'lastName should match');
  assert.deepEqual(this.$('input[id="client-phone-number"]').val(), this.get('model.phoneNumber'), 'phoneNumber should match');
  assert.deepEqual(this.$('input[id="client-street"]').val(), this.get('model.street'), 'streetName should match');
  assert.deepEqual(this.$('input[id="client-city"]').val(), this.get('model.city'), 'city should match');
  assert.deepEqual(this.$('input[id="client-province"]').val(), this.get('model.province'), 'province should match');
  assert.deepEqual(this.$('input[id="client-postal-code"]').val(), this.get('model.postalCode'), 'postalCode should match');
  assert.deepEqual(this.$('input[id="client-email"]').val(), this.get('model.email'), 'email should match');
});
