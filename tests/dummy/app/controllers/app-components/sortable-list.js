import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  content: [
    { name: 'john', value: '1' },
    { name: 'ben', value: '2' },
    { name: 'greg', value: '3' },
    { name: 'fraser', value: '4' },
    { name: 'janyk', value: '5' },
    { name: 'steve', value: '6' }
  ]
});