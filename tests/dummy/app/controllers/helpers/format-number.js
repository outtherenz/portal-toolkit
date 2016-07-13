import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  thisExample:{
    original: 12345.6789,
    format:"number",
    places:1,
    sigfigs:1
  },
  numberExamples: [
    {
      original: 12345.6789,
      format:"number",
      places:"",
      sigfigs:"",
      equation:"{{format-number 'number' 12345.6789}}"
    },{
      original: 12345.6789,
      format:"number",
      places:"",
      sigfigs:1,
      equation:"{{format-number 'number' 12345.6789 sigfigs=2}}"
    },{
      original: 12345.6789,
      format:"number",
      places:1,
      sigfigs:"",
      equation:"{{format-number 'number' 12345.6789 places=3}}"
    },{
      original: 12345.6789,
      format:"number",
      places:1,
      sigfigs:1,
      equation:"{{format-number 'number' 12345.6789 sigfigs=2 places=2}}"
    },{
      original: 12345.6789,
      format:"number",
      places:5,
      sigfigs:"",
      equation:"{{format-number 'number' 12345.6789 places=5}}"
    },{
      original: 12345.6789,
      format:"number",
      places:"",
      sigfigs:5,
      equation:"{{format-number 'number' 12345.6789 sigfigs=5}}"
    },{
      original: 12345.6789,
      format:"number",
      places:5,
      sigfigs:5,
      equation:"{{format-number 'number' 12345.6789 sigfigs=5 places=5}}"
    }],
    currencyExamples: [
      {
        original: 12345.6789,
        format:"currency",
        places:"",
        sigfigs:"",
        equation:"{{format-number 'number' 12345.6789}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:"",
        sigfigs:1,
        equation:"{{format-number 'number' 12345.6789 sigfigs=2}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:1,
        sigfigs:"",
        equation:"{{format-number 'number' 12345.6789 places=3}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:1,
        sigfigs:1,
        equation:"{{format-number 'number' 12345.6789 sigfigs=2 places=2}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:5,
        sigfigs:"",
        equation:"{{format-number 'number' 12345.6789 places=5}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:"",
        sigfigs:5,
        equation:"{{format-number 'number' 12345.6789 sigfigs=5}}"
      },{
        original: 12345.6789,
        format:"currency",
        places:5,
        sigfigs:5,
        equation:"{{format-number 'number' 12345.6789 sigfigs=5 places=5}}"
      }],
});
