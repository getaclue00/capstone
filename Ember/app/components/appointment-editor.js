import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  wasServiceSelected: Ember.computed('model.service', function(){
    let service = this.get('model.service');
    let serviceDuration = service.get('duration');
    let formattedEnd = this.get('model.end');

    if (service.get('name') && service.get('duration')) {
      let newEndDuration = moment(formattedEnd).add(serviceDuration, 'minutes').format('YYYY-MM-DDTHH:mm');
      this.get('model').set('formattedEnd', newEndDuration);
      return true;
    } else {
      return false;
    }
  }),

  aSelectedService: Ember.computed('model.service', function(){
    return this.get('model.service');
  }),

  aSelectedEmployee: Ember.computed('model.employee', function(){
    return this.get('model.employee');
  }),

  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  },

  actions: {
    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('model').set('employee', employee);
      }
    },

    selectService(service) {
      if(!Ember.isEmpty(service)){
        this.get('model').set('service', service);
      }
    }
  }
});
