import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  sortedServices: Ember.computed.sort('model', 'sortProperties'),
  actions: {

    handleAddNewService() {
      this.transitionToRoute('services.new');
    },

    handleEditService(service){
      console.log("hi");
      this.transitionToRoute('services.show', service.id);
    },

    handleDeleteService(service){
      this.transitionToRoute('services.delete', service.id);
    }
  }
});
