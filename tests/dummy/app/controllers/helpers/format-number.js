import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  formulae1: "{{format-number 'number' 123.456}}",
  formulae2: "{{format-number 'number' 123.456 places=3}}",
  formulae3: "{{format-number 'number' -123.456}}",
  formulae4: "{{format-number 'integer' 3.5}}",
  formulae5: "{{format-number 'integer' 31235134.123}}",
  formulae6: "{{format-number 'integer' 31235134.123 sigfigs=4}}",
  formulae7: "{{format-number 'currency' 3.5}}",
  formulae8: "{{format-number 'percentage' 0.547}}",
  formulae9: "{{format-number 'percentage' 0.547 places=1}}"
});
