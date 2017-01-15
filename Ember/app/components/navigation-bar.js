import Ember from 'ember';

export default Ember.Component.extend({
  // sliding actions done via
  // http://www.w3schools.com/howto/howto_js_sidenav.asp

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    },

    openNav() {
      document.getElementById("mySidenav").style.width = "180px";
      document.getElementById("navbar-toggle-button-small-screen").style.display = "none";
      document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    },

    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("navbar-toggle-button-small-screen").style.display = "";
      document.body.style.backgroundColor = "";
    }
  }
});
