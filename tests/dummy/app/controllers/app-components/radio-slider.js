import Controller from '@ember/controller';

export default Controller.extend({
  radioContent1: [
    { label: 'Month', value: 'month' },
    { label: 'YTD', value: 'ytd' }
  ],
  radioContent2: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' }
  ],
  codeSnippet: '{{radio-slider options=radioContent selected=periodType}}',
  periodType1: 'month',
  periodType2: '4'

});
