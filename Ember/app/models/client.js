import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany } = DS;

export default DS.Model.extend({
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



