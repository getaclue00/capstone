import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    handleAddNewService() {
      this.transitionToRoute('services.new');
    },

    handleEditService(service){
      console.log(service);
      this.transitionToRoute('services.show', service);
    }
  }
});
