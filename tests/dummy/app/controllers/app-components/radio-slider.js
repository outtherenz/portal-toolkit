import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  radioContent: [
    { label: 'Month', value: 'month' },
    { label: 'YTD', value: 'ytd' }
  ],

  periodType: 'month'

});
