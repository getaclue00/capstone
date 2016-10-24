import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    handleAddNewService(jsEvent) {
      console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
      this.transitionToRoute('services.new');
    }
  }
});
