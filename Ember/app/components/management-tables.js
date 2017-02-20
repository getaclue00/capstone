import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
      this.$('#has-datatable').DataTable({
     });
  },
  employeeCollection: Ember.computed('collection', function() {
    return this.get('collection') === 'employees';
  }),


  actions: {
    viewOperations(id){
      Ember.$(`tr.${id} td div.management-operation`).toggle( "slow");    }
  }
});
