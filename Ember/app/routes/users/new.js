import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	// //To opt into a full transition when a controller query param property changes, you can use the optional queryParams configuration hash on the Route associated with that controller, and set that query param's refreshModel config property to true
 // queryParams: {
 //    category: {
 //      refreshModel: true
 //    }
 //  },
  model() {
     return this.get('store').createRecord('user');
     // this.store.find('employee', params.employees_id).then((employee) => {
     //      user.set('employee', employee);
     //      user.save();
     //    }); 
     // return user;
  },

  actions: {
    goBackToListOfEmployees() {
      this.transitionTo('employees');
    }
  }
});



