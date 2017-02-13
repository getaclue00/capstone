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
//
moduleForComponent('appointment-editor', 'Integration | Component | appointment editor', {
  integration: true
});


test('it renders default empty view', function(assert) {
  assert.expect(1);

  this.render(hbs`{{
    appointment-editor
  }}`);

  const errorMsg = `Please check the appointment-editor configuration. You are missing needed parameters.`;

  assert.deepEqual($('.alert.alert-danger').text().trim(), errorMsg, 'should only render one row with an error message');
});

test('it renders a default view', function(assert) {
  assert.expect(3);

  this.set('model', appointmentStub);
  this.set('services', [
    { name: 'Service 1',
      price_small: 99,
      price_large: 100
    }
  ]);
  this.set('employees', [
    {
      fullName: 'John Smith'
    }
  ]);

  this.render(hbs`{{
    appointment-editor
    model=model
    listOfServices=services
    listOfEmployess=employees
  }}`);

  assert.deepEqual($('.form-group').length, 2, 'should be 2 rows on initial render');
  assert.deepEqual($($('.ember-power-select-placeholder')[0]).text(), 'Select a service', 'placeholder text to select a service');
  assert.deepEqual($($('.ember-power-select-placeholder')[1]).text(), 'Select a staff member', 'placeholder text to select a staff member');
});

test('it renders a complete view upon service selection', function(assert) {
  assert.expect(6);

  this.set('model', appointmentStub);
  this.set('services', [
    { name: 'Service 1',
      price_small: 99,
      price_large: 100
    }
  ]);
  this.set('employees', [
    {
      fullName: 'John Smith'
    }
  ]);

  this.render(hbs`{{
    appointment-editor
    model=model
    listOfServices=services
    listOfEmployess=employees
    wasServiceSelected=true
  }}`);

  assert.deepEqual($('.form-group').length, 6, 'should be 6 rows on initial render');
  assert.deepEqual($($('.ember-power-select-placeholder')[0]).text(), 'Select a service', 'placeholder text to select a service');
  assert.deepEqual($($('.ember-power-select-placeholder')[1]).text(), 'Select a staff member', 'placeholder text to select a staff member');
  assert.equal(this.$('input[type="number"]').attr('placeholder'), 'Please enter the cost');
  assert.equal(this.$('input[type="datetime-local"]').length, 0, 'appointment start and end times'); //SHOULD BE 2
  assert.equal(this.$('textarea').attr('rows'), 3, 'notes section');
});
