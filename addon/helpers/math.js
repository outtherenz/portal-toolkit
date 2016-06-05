import Ember from 'ember';

const { Helper } = Ember;

export function math([ operand1, operator, operand2 ]) {
  switch (operator) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/': return operand1 / operand2;
    default: throw new Error('Unknown operator: ' + operator);
  }
}

export default Helper.helper(math);
