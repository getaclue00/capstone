import DS from 'ember-data';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, hasMany } = DS;
const Validations = buildValidations({
  email: {
    description: 'E-mail',
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  firstName: {
    description: 'First name',
    validators: [
      validator('presence', true),
    ]
  },
  lastName: {
    description: 'Last name',
    validators: [
      validator('presence', true),
    ]
  },
  phoneNumber: {
    description: 'Phone number',
    validators: [
      validator('presence', true),
      validator('format', {
        regex: /^[1-9]\d{2}-\d{3}-\d{4}/,
        message: 'Use ###-###-#### format'
      })
    ]
  },
  street: {
    description: 'Street',
    validators: [
      validator('presence', true),
    ]
  },
  city: {
    description: 'City',
    validators: [
      validator('presence', true),
    ]
  },
  province: {
    description: 'Province',
    validators: [
      validator('presence', true),
    ]
  },
  postalCode: {
    description: 'Postal code',
    validators: [
      validator('presence', true),
      validator('format', {
        regex: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
        message: 'Use A#A #A#A format'
      })
    ]
  },
});

export default DS.Model.extend(Validations,{
  lastName:     attr('string'),
  firstName:    attr('string'),
  email:        attr('string'),
  phoneNumber:  attr('string'),
  street:       attr('string'),
  city:         attr('string'),
  province:     attr('string'),
  postalCode:   attr('string'),
  appointments: hasMany('appointment', { async: true }),
  fullName: Ember.computed('lastName', 'firstName', function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  address: Ember.computed('street', 'city', 'province', 'postalCode', function(){
    return `${this.get('street')}, ${this.get('city')}, \
    ${this.get('province')}, ${this.get('postalCode')}`;
  })
});



