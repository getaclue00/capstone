import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import moment from 'moment';

const EmployeeStub = Ember.Object.extend({
  getFirstName() {
    return this.get('firstName');
  },

  getLastName() {
    return this.get('lastName');
  },

  getPhoneNumber() {
    return this.get('phoneNumber');
  },

  getStreetNumber() {
    return this.get('streetNumber');
  },

  getStreetName() {
    return this.get('streetName');
  },

  getCity() {
    return this.get('city');
  },

  getProvice() {
    return this.get('province');
  },

  getPostalCode() {
    return this.get('postalCode');
  },

  getStartDate() {
    return this.get('startDate');
  },

  getEndDate() {
    return this.get('endDate');
  },

  getNotes() {
    return this.get('notes');
  }

});

const time = moment('11/11/2016').format('YYYY-MM-DDTHH:mm');
let employee = EmployeeStub.create({
  firstName: 'Bruce',
  lastName: 'Wayne',
  phoneNumber: '111-111-1111',
  streetNumber: '45',
  streetName: 'Bank Street',
  city: 'Ottawa',
  province: 'Ontario',
  postalCode: 'T5T 3Y3',
  startDate: time,
  endDate: time,
  notes: 'This is a note'
});

moduleForComponent('employee-editor', 'Integration | Component | employee editor', {
  integration: true
});

test('it renders a view with a model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', employee);

  assert.expect(16);

  this.render(hbs`{{
    employee-editor
    model=model
  }}`);

  // Test in correct inputs bar are present
  assert.equal(this.$('input[type="text"]').length, 8, 'should be 6 text fields'); //SHOULD BE 6
  assert.equal(this.$('input[type="number"]').length, 1, 'should be only 1 input number field for streetNumber');
  assert.equal(this.$('input[type="tel"]').length, 1, 'should be only 1 input tel field for phoneNumber');
  assert.equal(this.$('input[type="datetime-local"]').length, 2, 'should be only 2 input for start and end dates');
  assert.equal(this.$('textarea').length, 1, 'should be only 1 text area for the notes');

  // Test if proper values are placed into form
  assert.equal(this.$('input[id="employee-first-name"]').val(), this.get('model.firstName'), 'firstNames should match');
  assert.equal(this.$('input[id="employee-last-name"]').val(), this.get('model.lastName'), 'lastName should match');
  assert.equal(this.$('input[id="employee-phone-number"]').val(), this.get('model.phoneNumber'), 'phoneNumber should match');
  assert.equal(this.$('input[id="employee-street-number"]').val(), this.get('model.streetNumber'), 'streetNumber for large car should match');
  assert.equal(this.$('input[id="employee-street-name"]').val(), this.get('model.streetName'), 'streetName should match');
  assert.equal(this.$('input[id="employee-city"]').val(), this.get('model.city'), 'city should match');
  assert.equal(this.$('input[id="employee-province"]').val(), this.get('model.province'), 'province should match');
  assert.equal(this.$('input[id="employee-postal-code"]').val(), this.get('model.postalCode'), 'postalCode should match');
  assert.equal(this.$('input[id="employee-start-date"]').val(), this.get('model.startDate'), 'startDate should match');
  assert.equal(this.$('input[id="employee-end-date"]').val(), this.get('model.endDate'), 'endDate should match');
  assert.equal(this.$('textarea').val(), this.get('model.notes'), 'the textarea should be filled in with the employee notes');
});

