import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  cool: 'notcool',

  actions: {
    wow() {
      alert('POW');
      console.log('hello');
    }
  },
  mode: undefined,
  watchMode: function() {
    $('.sidebar').toggleClass("modeSide");
    $('.page-header').toggleClass("modeHead")
  }.observes('mode')
});
