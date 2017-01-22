import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { attr, Model, belongsTo } = DS;

const { computed } = Ember;

export default Model.extend({
  color:      attr('string', { defaultValue: '#AB00FF' }),
  textColor:  attr('string', { defaultValue: '#FFFFFF' }),
  title:      attr('string', { defaultValue: 'New Appointment' }),
  start:      attr('isodate'),
  end:        attr('isodate'),
  notes:      attr('string', { defaultValue: '' }),
  status:     attr('string', { defaultValue: 'pending' }),
  weekNumber: attr('number'),
  service:    belongsTo('service'),
  employee:   belongsTo('employee'),
  formattedStart: computed('start', {
    get() {
      return moment(this.get('start')).format('YYYY-MM-DDTHH:mm');
    },
    set(key, value) {
      this.set('start', moment(value).format('YYYY-MM-DDTHH:mm'));
      this.set('weekNumber', Number(moment(value).format('w')));
      return value;
    }
  }),
  formattedEnd: computed('end', {
    get() {
      return moment(this.get('end')).format('YYYY-MM-DDTHH:mm');
    },
    set(key, value) {
      this.set('end', moment(value).format('YYYY-MM-DDTHH:mm'));
      return value;
    }
  }),
});
