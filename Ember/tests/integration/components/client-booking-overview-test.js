import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import moment from 'moment';

const time = moment().format('YYYY-MM-DDTHH:mm');

const AppointmentStub = Ember.Object.extend({
  getStart() {
    return this.get('start');
  },

  getEnd() {
    return this.get('end');
  },

  getCost() {
    return this.get('cost');
  },

  getNotes() {
    return this.get('notes');
  },

  getStatus() {
    return this.get('status');
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

  getfullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }

});

let appointment = AppointmentStub.create({
  start:      time,
  end:        moment(time).add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
  cost:       '55',
  notes:      'A nice car',
  status:     'pending',
  weekNumber: Number(moment(time).format('w')),
  service:    undefined,
  employee:   undefined,
  client:     undefined,
});

const ClientStub = Ember.Object.extend({
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
  },

  getAddress() {
    return this.get('address');
  }

});

let client = ClientStub.create({
  firstName: 'Bruce',
  lastName: 'Wayne',
  email: 'testing@test.com',
  phoneNumber: '111-111-1111',
  street: '45 Bank Street',
  city: 'Ottawa',
  province: 'Ontario',
  postalCode: 'T5T 3Y3',
  fullName: 'Bruce Wayne',
  address: '10 Test Street, Ottawa, Ontario, K2S 1R2'
});

const ServiceStub = Ember.Object.extend({
  getName() {
    return this.get('name');
  },

  getPrice() {
    return this.get('price');
  },

  getVehicleSize() {
    return this.get('vehicleSize');
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
  price: '100',
  vehicleSize: 'Small',
  duration: '60',
  description: 'Cleaning the car',
  active: true,
  displayable: false,
});


moduleForComponent('client-booking-overview', 'Integration | Component | client booking overview', {
  integration: true
});

test('it renders with complete appointment information', function(assert) {

  assert.expect(10);

  this.set('appointment', appointment);
  this.set('client', client);
  this.set('appointment.service', service);
  this.set('appointment.employee', client);

  this.render(hbs`{{
    client-booking-overview
    appointment=appointment
    client=client
  }}`);

  assert.deepEqual(this.$('p').length, 10, 'should be 10 <p></p> tags for various confirmation details');
  assert.deepEqual(this.$('p[id="appointment-service-name"]')[0].innerHTML, this.get('appointment.service.name'), 'Appointment name should match');
  assert.deepEqual(this.$('p[id="appointment-duration"]')[0].innerHTML, "Duration: " + this.get('appointment.service.duration') + " minutes", 'Appointment duration should match');
  assert.deepEqual(this.$('p[id="appointment-service-price"]')[0].innerHTML, "Price: $" + this.get('appointment.service.price'), 'Appointment price should match');
  assert.deepEqual(this.$('p[id="appointment-employee-name"]')[0].innerHTML, "Employee: " + this.get('appointment.employee.firstName') + " " + this.get('appointment.employee.lastName'), 'Employee name should match');
  assert.deepEqual(this.$('p[id="client-name"]')[0].innerHTML, "Name: " + this.get('client.firstName') + " " + this.get('client.lastName'), 'Full name should match');
  assert.deepEqual(this.$('p[id="client-email"]')[0].innerHTML, "Email: " + this.get('client.email'), 'Email should match');
  assert.deepEqual(this.$('p[id="client-phone-number"]')[0].innerHTML, "Phone Number: " + this.get('client.phoneNumber'), 'Phone number should match');
  assert.deepEqual(this.$('p[id="client-address"]')[0].innerHTML, "Address: " + this.get('client.address'), 'Address should match');
  assert.deepEqual(this.$('p[id="appointment-notes"]')[0].innerHTML, this.get('appointment.notes'), 'Appointment notes should match');
});
