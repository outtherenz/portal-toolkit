import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  period: {
    start: '2015-04',
    end: '2016-03',
    type: 'month'
  }
});
