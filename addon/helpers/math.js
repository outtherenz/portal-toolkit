import Ember from 'ember';

const { Helper } = Ember;

export function math([ operand1, operator, operand2 ]) {
  if (isNaN(operand1) || operand1 === null || operand1 === true) {
    throw new Error('operator1 is not a number (a NaN): ' + operand1);
  } else
  if (isNaN(operand2) || operand2 === null || operand2 === true) {
    throw new Error('operator2 is not a number (a NaN): ' + operand2);
  } else {
    operand1 = parseInt(operand1, 10);
    operand2 = parseInt(operand2, 10);
    switch (operator) {
      case '+': return (operand1 + operand2);
      case '-': return (operand1 - operand2);
      case '*': return (operand1 * operand2);
      case '/': return operand1 / operand2;
      default: throw new Error('Unknown operator: ' + operator);
    }
  }
}

export default Helper.helper(math);
