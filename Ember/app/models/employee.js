import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  lastName:     attr('string'),
  firstName:    attr('string'),
  email:        attr('string'),
  phoneNumber:  attr('string'),
  streetNumber: attr('number'),
  streetName:   attr('string'),
  city:         attr('string'),
  province:     attr('string'),
  postalCode:   attr('string'),
  startDate:    attr('isodate'),
  endDate:      attr('isodate'),
  isAdmin:      attr('boolean'),
  notes:        attr('string'),
  appointments: hasMany('appointment', { async: true }),
  fullName: Ember.computed('lastName', 'firstName', function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
