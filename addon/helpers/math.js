import Ember from 'ember';

const { Helper } = Ember;

export function math([ operand1, operator, operand2 ]) {
  operand1 = parseOperand(operand1);
  operand2 = parseOperand(operand2);

  switch (operator) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/': return operand1 / operand2;
    default: throw new Error('Unknown operator: ' + operator);
  }
}

function parseOperand(value) {
  if (isNaN(value) || value === null || value === true) {
    throw new Error('Expected operand passed to math help to be a number, got ' + value);
  }

  if (value !== Infinity) {
    value = parseInt(value, 10);
  }

  return value;
}

export default Helper.helper(math);
