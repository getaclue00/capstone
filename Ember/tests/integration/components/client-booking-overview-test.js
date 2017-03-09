import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import moment from 'moment';

const time = moment().format('YYYY-MM-DDTHH:mm');
const appointmentStub = Ember.Object.extend({
  start:      time,
  end:        moment(time).add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
  cost:       '55',
  getStatus() {
    return this.get('status');
  },
  notes:      '',
  status:     'pending',
  weekNumber: Number(moment(time).format('w')),
  service:    undefined,
  employee:   undefined,
  client:     undefined,
  formattedStart: Ember.computed('start', {
    get() {
      return moment(this.get('start')).format('YYYY-MM-DDTHH:mm');
    },
    set(key, value) {
      this.set('start', moment(value).format('YYYY-MM-DDTHH:mm'));
      this.set('weekNumber', Number(moment(value).format('w')));
      return value;
    }
  }),
  formattedEnd: Ember.computed('end', {
    get() {
      return moment(this.get('end')).format('YYYY-MM-DDTHH:mm');
    },
    set(key, value) {
      this.set('end', moment(value).format('YYYY-MM-DDTHH:mm'));
      return value;
    }
  })
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
  postalCode: 'T5T 3Y3'
});

moduleForComponent('client-booking-overview', 'Integration | Component | client booking overview', {
  integration: true
});

test('it renders with complete appointment information', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('appointment', appointmentStub);

  this.set('services', [{
    name: 'Service 1',
    price: 99,
    vehicleSize: 'Small'
  }]);
  this.set('employees', [{
    fullName: 'John Smith'
  }]);

  this.set('clients', [{
    fullName: 'John Smith'
  }]);

  this.render(hbs`{{
    client-booking-overview
    appointment=appointment
    client=client
    listOfEmployess=employees
    listOfClients=clients
    wasServiceSelected=true
  }}`);
});
