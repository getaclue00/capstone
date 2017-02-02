import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  lastName:     attr('string'),
  firstName:    attr('string'),
  phoneNumber:  attr('string'),
  streetNumber: attr('number'),
  streetName:   attr('string'),
  city:         attr('string'),
  province:     attr('string'),
  postalCode:   attr('string'),
  startDate:    attr('isodate'),
  endDate:      attr('isodate'),
  notes:        attr('string'),
  appointments: hasMany('appointment', { async: true }),
  user:   belongsTo('user'),
  fullName: Ember.computed('lastName', 'firstName', function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  address: Ember.computed('streetNumber', 'streetName', 'city', 'province', 'postalCode', function(){
    return `${this.get('streetNumber')}-${this.get('streetName')}, ${this.get('city')}, \
${this.get('province')}, ${this.get('postalCode')}`;
 }),

  formattedStartDate: Ember.computed('startDate', function(){
    return moment(this.get('startDate')).format('YYYY-MM-DDTHH:mm');
  })
});
