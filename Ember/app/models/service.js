import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string', { defaultValue: 'not setup' }),
  duration: DS.attr('int', { defaultValue: '60' }),
  price_sm_car: DS.attr('double', { defaultValue: '100' }),
  price_lrg_car: DS.attr('double', { defaultValue: '120' }),
  description: DS.attr('text', { defaultValue: '...' }),
});
