import Ember from 'ember';

const { Helper } = Ember;

export function math(params) {
  const operator = String(params[1]);
  const operand1 = Number(params[0]);
  const operand2 = Number(params[2]);

  switch (operator) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/': return operand1 / operand2;
    default:  return '';
  }
}

export default Helper.helper(math);
