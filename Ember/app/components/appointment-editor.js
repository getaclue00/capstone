import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  listOfAppointmentStatuses: [
    "pending",
    "confirmed",
    "new time proposed",
    "completed",
    "cancelled"
  ],

  showLocationMap: false,
  currentDate: moment().format('MM/DD/YYYY'),
  selectedDate: null,
  selectTime: null,

  showLocationMapDiv: Ember.computed('model.location', function() {
    let location = this.get('model.location');
    if (Ember.isEmpty(location)) {
      this.set('showLocationMap', false);
      return false;
    } else {
      return true;
    }
  }),

  wasServiceSelected: Ember.computed('model.service', function(){
    let service = this.get('model.service');

    if (service) {
      if (service.get('name') && service.get('duration')) {
        return true;
      }
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

  aSelectedClient: Ember.computed('model.client', function(){
    return this.get('model.client');
  }),

  didInsertElement() {
    this._super(...arguments);
    const insertElementAction = this.get('onDidInsertElementAction');
    if (insertElementAction) {
      insertElementAction();
    }
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
    },

    selectClient(client) {
      if(!Ember.isEmpty(client)){
        this.get('model').set('client', client);
      }
    },
    selectAppointmentStatus(status) {
      if(!Ember.isEmpty(status)) {
        this.get('model').set('status', status);
      }
    },

    toggleShowLocationMap() {
      this.toggleProperty('showLocationMap');
    },

    onSaveClick() {
      this.get('onSaveAction')();
    },

    onCancelClick() {
      this.get('onCancelAction')();
    }
  }
});
