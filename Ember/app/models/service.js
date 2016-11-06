import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
  name:         attr('string', { defaultValue: '' }),
  duration:     attr('number', { defaultValue: '60.00' }),
  price_small:  attr('number', { defaultValue: '100.00' }),
  price_large:  attr('number', { defaultValue: '120.00' }),
  description:  attr('string', { defaultValue: '...' }),
  active:       attr('boolean', { defaultValue: false }),
  displayable:  attr('boolean', { defaultValue: false }),
});