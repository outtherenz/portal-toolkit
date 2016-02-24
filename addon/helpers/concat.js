import Ember from 'ember';

const { Helper } = Ember;

export function concat() {
  return [ ...arguments ].join('');
}

export default Helper.helper(concat);
