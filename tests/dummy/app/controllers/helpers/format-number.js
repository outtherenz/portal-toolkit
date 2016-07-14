import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  formats:[
    {name: 'Number Examples',
      examples: [
      {
        original: 12345.6789,
        format: 'number',
        places: null,
        sigfigs: null,
        equation: '{{format-number 'number' 12345.6789}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: null,
        sigfigs: 1,
        equation: '{{format-number 'number' 12345.6789 sigfigs=2}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: 1,
        sigfigs: null,
        equation: '{{format-number 'number' 12345.6789 places=3}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: 1,
        sigfigs: 1,
        equation: '{{format-number 'number' 12345.6789 sigfigs=2 places=2}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: 5,
        sigfigs: null,
        equation: '{{format-number 'number' 12345.6789 places=5}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: null,
        sigfigs: 5,
        equation: '{{format-number 'number' 12345.6789 sigfigs=5}}'
      },{
        original: 12345.6789,
        format: 'number',
        places: 5,
        sigfigs: 5,
        equation: '{{format-number 'number' 12345.6789 sigfigs=5 places=5}}'
      }
    ]},  {name: 'Percentage Examples', examples: [
      {
        original: 12345.6789,
        format: 'percentage',
        places: null,
        sigfigs: null,
        equation: '{{format-number 'percentage' 12345.6789}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: null,
        sigfigs: 1,
        equation: '{{format-number 'percentage' 12345.6789 sigfigs=2}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: 1,
        sigfigs: null,
        equation: '{{format-number 'percentage' 12345.6789 places=3}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: 1,
        sigfigs: 1,
        equation: '{{format-number 'percentage' 12345.6789 sigfigs=2 places=2}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: 5,
        sigfigs: null,
        equation: '{{format-number 'percentage' 12345.6789 places=5}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: null,
        sigfigs: 5,
        equation: '{{format-number 'percentage' 12345.6789 sigfigs=5}}'
      },{
        original: 12345.6789,
        format: 'percentage',
        places: 5,
        sigfigs: 5,
        equation: '{{format-number 'percentage' 12345.6789 sigfigs=5 places=5}}'
      }]}, {name: 'Currency Examples', examples: [
        {
          original: 12345.6789,
          format: 'currency',
          places: null,
          sigfigs: null,
          equation: '{{format-number 'currency' 12345.6789}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: null,
          sigfigs: 1,
          equation: '{{format-number 'currency' 12345.6789 sigfigs=2}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: 1,
          sigfigs: null,
          equation: '{{format-number 'currency' 12345.6789 places=3}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: 1,
          sigfigs: 1,
          equation: '{{format-number 'currency' 12345.6789 sigfigs=2 places=2}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: 5,
          sigfigs: null,
          equation: '{{format-number 'currency' 12345.6789 places=5}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: null,
          sigfigs: 5,
          equation: '{{format-number 'currency' 12345.6789 sigfigs=5}}'
        },{
          original: 12345.6789,
          format: 'currency',
          places: 5,
          sigfigs: 5,
          equation: '{{format-number 'currency' 12345.6789 sigfigs=5 places=5}}'
        }]}],
  numberExample:{
    original: 12345.6789,
    format: 'number',
    places: 1,
    sigfigs: 1
  },
  currencyExample:{
    original: 12345.6789,
    format: 'currency',
    places: 1,
    sigfigs: 1
  },
  integerExample:{
    original: 12345.6789,
    format: 'integer',
    places: 1,
    sigfigs: 1
  },
  percentageExample:{
    original: 12345.6789,
    format: 'percentage',
    places: 1,
    sigfigs: 1
  },



});
