import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['id:asc'],
  sortedServices: Ember.computed.sort('model', 'sortProperties'),

});
