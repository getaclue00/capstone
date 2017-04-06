import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$('#has-datatable').DataTable({
     });
    });
  },

  willDestroyElement() {
    this.$('#has-datatable').DataTable().destroy();
  },

  employeeCollection: Ember.computed('collection', function() {
    return this.get('collection') === 'employees';
  }),

  actions: {
    viewOperations(id){
      Ember.$(`tr.${id} td div.management-operation`).toggle( "slow");
    }
  }
});
