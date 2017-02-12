import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
      this.$('#has-datatable').DataTable({
     });
  },
  employeeCollection: function() {
    return this.get('collection') === 'employees';
  }.property('collection')
});
