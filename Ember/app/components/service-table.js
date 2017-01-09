import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table'
  classNames: ['table'],
  _didInsertElement: function() {
     this.$('#has-datatable').dataTable({
        scrollY: 200,
        scrollCollapse: true,
        jQueryUI: true
     });
  }.on('didInsertElement')
});
