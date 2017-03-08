import DS from 'ember-data';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, hasMany } = DS;
const Validations = buildValidations({
  email: {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  firstName: {
    validators: [
      validator('presence', true),
    ]
  },
  lastName: {
    validators: [
      validator('presence', true),
    ]
  },
  phoneNumber: {
    validators: [
      validator('presence', true),
      // validator('format', {
      //   regex: '((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}'
      // })
    ]
  },
  street: {
    validators: [
      validator('presence', true),
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



