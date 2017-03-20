import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, hasMany } = DS;
const { computed } = Ember;

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
  employee:       hasMany('employee'),
  contactEmail:   attr('string', { defaultValue: 'segradetailingcapstoneteam@gmail.com' }),
  contactPhoneNumber: attr('string'),
  daysOfWeekNotWorking:   computed('workMonday', 'workTuesday', 'workWednesday', 'workThursday', 'workFriday', 'workSaturday', 'workSunday', function() {
    let result = [];
    if (!this.get('workSunday'))    { result.push('0'); }
    if (!this.get('workMonday'))    { result.push('1'); }
    if (!this.get('workTuesday'))   { result.push('2'); }
    if (!this.get('workWednesday')) { result.push('3'); }
    if (!this.get('workThursday'))  { result.push('4'); }
    if (!this.get('workFriday'))    { result.push('5'); }
    if (!this.get('workSaturday'))  { result.push('6'); }
    return result.toString();
  })
});
