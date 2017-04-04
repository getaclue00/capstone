import Ember from 'ember';

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

    selectAppointmentTime(date) {
      if (moment().format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') || moment(date).isAfter(moment())) {
        this.set('selectedDate', moment(date).format('MMMM D, YYYY'));
        this.set('selectTime', true);
        if(!Ember.isEmpty(this.get('model.employee'))){
          var self = this;
          var dayOfTheWeek = moment(self.get('selectedDate')).format('dddd');
          self.get('store').query('company-preference', {
            filter: {
              employee_id: self.get('model.employee.id')
            }
          }).then(function(result) {

            var arrayTime = [];
            var employeeStart = result.get('firstObject').get(dayOfTheWeek.toLowerCase() + "Open");
            var employeeEnd = result.get('firstObject').get(dayOfTheWeek.toLowerCase() + "Close");
            var employeeWorking = result.get('firstObject').get("work" + dayOfTheWeek);
            var timeDiff = moment(employeeEnd, 'h:mma').diff(moment(employeeStart, 'h:mma'));
            var time = moment(employeeStart, 'h:mm').format('h:mma');
            self.get('store').query('appointment', {
              filter: {
                date:        moment(self.get('selectedDate'),'MMMM D, YYYY').format('YYYY-MM-DD'),
                employee_id: self.get('model.employee.id')
              }
            }).then(function(results) {
              if(employeeWorking) {
                var apptCounter = 0;
                for(var i = 0 ; i < timeDiff; i+=1800000){
                  if(results.objectAt(apptCounter)){
                    var service = results.objectAt(apptCounter).get('service');
                    var apptStart = moment(results.objectAt(apptCounter).get('start')).format('h:mma');
                    var apptCheck = moment(time, 'h:mma').add(service.get('duration') + service.get('bufferTime'), 'minutes')
                     .format('h:mma');
                    // An appointment already exist is this time slot
                    if(apptStart === time) {
                      var apptEnd = moment(results.objectAt(apptCounter).get('end')).format('h:mma');
                      var apptDiff = moment(apptEnd, 'h:mma').diff(moment(apptStart, 'h:mma'));
                      time = moment(apptEnd,'h:mma').format('h:mma');
                      i+= apptDiff;
                      apptCounter++;
                    } else if (apptCheck > apptStart){ // Not enough time to complete appointment
                      time = moment(time, 'h:mma').add(30, 'minutes').format('h:mma');
                    } else {
                      arrayTime.push(moment(time, 'h:mma').format('h:mma'));
                      time = moment(time, 'h:mma').add(30, 'minutes').format('h:mma');
                    }
                  } else {
                    arrayTime.push(moment(time, "h:mma").format('h:mma'));
                    time = moment(time, 'h:mma').add(30, 'minutes').format('h:mma');
                  }
                }
              }
              self.set('availableTimes', arrayTime);
            });
          });
        }
      }
    },

    confirmSelection(time) {
      var date = this.get('selectedDate');
      var service = this.get('model.service');
      var startTime = moment(date + " " + time,'MMMM D, YYYY h:mma' ).format('YYYY-MM-DDTHH:mm');
      var endTime = moment(date + " " + moment(time, 'h:mma')
                   .add(service.get('duration') + service.get('bufferTime'), 'minutes')
                   .format('h:mma'),'MMMM D, YYYY h:mma').format('YYYY-MM-DDTHH:mm');
      this.set('model.formattedStart', startTime);
      this.set('model.formattedEnd', endTime);
    },

    onSaveClick() {
      this.get('onSaveAction')();
    },

    onCancelClick() {
      this.get('onCancelAction')();
    }
  }
});
