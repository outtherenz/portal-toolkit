import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  codeSample1: '{{value-change-indicator difference=target.monthDifference from=target.from to=target.to useColor=target.useColor increaseIsGood=target.increaseIsGood}}',
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
