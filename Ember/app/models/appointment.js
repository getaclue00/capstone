import DS from 'ember-data';

const { attr, Model, belongsTo } = DS;

export default Model.extend({
  color:      attr('string', { defaultValue: '#AB00FF' }),
  textColor:  attr('string', { defaultValue: '#FFFFFF' }),
  title:      attr('string', { defaultValue: 'New Appointment' }),
  start:      attr('isodate'),
  end:        attr('isodate'),
  notes:      attr('string', { defaultValue: '' }),
  status:     attr('string', { defaultValue: 'pending' }),
  service:    belongsTo('service'),
  employee:   belongsTo('employee'),

  ready(){
        if(!!this.get('employee')){
                return;
        }else{
                let emp= this.store.getById('employee', 0);
                this.set('appointment.employee', emp);
        }
  }

});
