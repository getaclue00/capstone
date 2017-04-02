import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  // sliding actions done via
  // http://www.w3schools.com/howto/howto_js_sidenav.asp

  session:        service(),
  currentUser:    service('current-user'),

  click(event) {
    this._super(...arguments);
    if(Ember.$(event.target).hasClass('nav-link')) {
      this.$().find('.collapse').collapse('hide');
    }
  },

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    },

    openNav() {
      document.getElementById("mySidenav").style.width = "180px";
      document.getElementById("navbar-toggle-button-left-small-screen").style.display = "none";
      document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    },

    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("navbar-toggle-button-left-small-screen").style.display = "";
      document.body.style.backgroundColor = "";
    },

    handleAddNewAppointment() {
      this.get('handleNewAppointment')();
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("navbar-toggle-button-left-small-screen").style.display = "";
      document.body.style.backgroundColor = "";
    },

    handleAddNewClient() {
      this.get('handleNewClient')();
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("navbar-toggle-button-left-small-screen").style.display = "";
      document.body.style.backgroundColor = "";
    }
  }
});
