import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  targets: [
    {
      monthDifference: 3,
      useColor: true,
      increaseIsGood: true
    }, {
      to: 8,
      from: -10,
      useColor: true,
      increaseIsGood: true
    }, {
      monthDifference: -3,
      to: 8,
      from: 10,
      useColor: true,
      increaseIsGood: false
    }, {
      to: 8,
      from: 10,
      useColor: true,
      increaseIsGood: false
    }
  ],

  actions: {
  }
});
