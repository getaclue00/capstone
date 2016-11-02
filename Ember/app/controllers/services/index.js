import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteService(service) {
      function onSuccessful() {
        console.log('Successfully deleted');
      }

      function onError(error) {
        throw error.message;
      }

      if (service) {
        service.destroyRecord().then(onSuccessful).catch(onError);
      }
    },

    handleAddNewService() {
      this.transitionToRoute('services.new');
    },

    handleEditService(service){
      this.transitionToRoute('services.show', service.id);
    }
  }
});
