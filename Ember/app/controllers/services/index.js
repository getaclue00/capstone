import Ember from 'ember';

export default Ember.Controller.extend({
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
