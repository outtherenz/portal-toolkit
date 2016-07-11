import Ember from 'ember';

const { Helper } = Ember;

export function math([ operand1, operator, operand2 ]) {
  if (isValidOperand(operand1) && isValidOperand(operand2)) {
    switch (operator) {
      case '+': return (operand1 + operand2);
      case '-': return (operand1 - operand2);
      case '*': return (operand1 * operand2);
      case '/': return operand1 / operand2;
      default: throw new Error('Unknown operator: ' + operator);
    }
  }
}

function isValidOperand(value) {
  if (isNaN(value) || value === null || value === true) {
    throw new Error('one of the operands is not a number (a NaN): ' + value);
  }
  if (value !== Infinity) {
    value = parseInt(value, 10);
  }
  return true;
}

export default Helper.helper(math);
