import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

const { computed } = Ember;

export default Model.extend({
  name:         attr('string', { defaultValue: '' }),
  duration:     attr('number', { defaultValue: '60.00' }),
  price:        attr('number', { defaultValue: '100.00' }),
  vehicle_size: attr('string', { defaultValue: 'small' }),
  description:  attr('string', { defaultValue: '...' }),
  active:       attr('boolean', { defaultValue: false }),
  displayable:  attr('boolean', { defaultValue: false }),
  appointments: hasMany('appointment', { async: true }),
  formattedActive: computed('active', function(){
      return (this.get('active') ? 'Yes' : 'No');
  }),
  formattedDisplayable: computed('displayable', function(){
      return (this.get('displayable') ? 'Yes' : 'No');
  })
});
