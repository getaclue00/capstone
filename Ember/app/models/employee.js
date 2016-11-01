import DS from 'ember-data';

const { Model, attr } = DS;

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
  startDate:    attr('isodate')
});
