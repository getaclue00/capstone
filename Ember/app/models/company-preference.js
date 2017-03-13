import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  workMonday:     attr('boolean', { defaultValue: false }),
  mondayOpen:     attr('string', { defaultValue: '08:00:00' }),
  mondayClose:    attr('string', { defaultValue: '17:00:00' }),
  workTuesday:    attr('boolean', { defaultValue: false }),
  tuesdayOpen:    attr('string', { defaultValue: '08:00:00' }),
  tuesdayClose:   attr('string', { defaultValue: '17:00:00' }),
  workWednesday:  attr('boolean', { defaultValue: false }),
  wednesdayOpen:  attr('string', { defaultValue: '08:00:00' }),
  wednesdayClose: attr('string', { defaultValue: '17:00:00' }),
  workThursday:   attr('boolean', { defaultValue: false }),
  thursdayOpen:   attr('string', { defaultValue: '08:00:00' }),
  thursdayClose:  attr('string', { defaultValue: '17:00:00' }),
  workFriday:     attr('boolean', { defaultValue: false }),
  fridayOpen:     attr('string', { defaultValue: '08:00:00' }),
  fridayClose:    attr('string', { defaultValue: '17:00:00' }),
  workSaturday:   attr('boolean', { defaultValue: false }),
  saturdayOpen:   attr('string', { defaultValue: '08:00:00' }),
  saturdayClose:  attr('string', { defaultValue: '17:00:00' }),
  workSunday:     attr('boolean', { defaultValue: false }),
  sundayOpen:     attr('string', { defaultValue: '08:00:00' }),
  sundayClose:    attr('string', { defaultValue: '17:00:00' }),
  employee:       belongsTo('employee')
});
