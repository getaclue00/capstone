import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$('#smartwizard').smartWizard({
      reverseButtonsOrder: true,
      // toolbarSettings: {
      //   toolbarExtraButtons: [
      //     $('<button></button>').text('Finish')
      //     .addClass('btn btn-info')
      //     .on('click', function(){
      //     alert('Finish button click');
      //     }),
      //   ]
      // }
    }),
  },
});
