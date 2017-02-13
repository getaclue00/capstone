import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
      this.$('#has-datatable').DataTable({
     });
  },
  employeeCollection() {
    return this.get('collection') === 'employees';
  }
});
