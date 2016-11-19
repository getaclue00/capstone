import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  color:      '#AB00FF',
  textColor:  '#FFFFFF',
  title:      'New Appointment',
  start:      faker.date.between('2016-11-01', '2016-11-30'),
  end:        faker.date.between('2016-11-01', '2016-11-30'),
  notes:      faker.lorem.paragraph
  // employee:   belongsTo('employee')
});
