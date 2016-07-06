import Ember from 'ember';

const { Controller } = Ember;
const { $ } = Ember;
export default Controller.extend({

  actions: {

  },
  mode: undefined,
  watchMode: function() {
    $('.sidebar').toggleClass('modeSide');
    $('.page-header').toggleClass('modeHead');
  }.observes('mode'),

  scaledDistThresholdR: 255,
  scaledDistThresholdG: 255,
  scaledDistThresholdB: 255,
  rgbColor: undefined,
  hexColor: undefined,
  colorInput: '#ffffff',
  scaledDistThresholdRGB: 'rgb(255,255,255)',
  pageWidth: '0.75',

  thresholdChanged: function() {
    var rVal = this.get('scaledDistThresholdR');
    var gVal = this.get('scaledDistThresholdG');
    var bVal = this.get('scaledDistThresholdB');
    var hexVal = this.get('colorInput');
    var rgbSwitch = this.get('rgbColor');
    var hexSwitch = this.get('hexColor');
    var pageWidth = this.get('pageWidth');
    var rgbVal = 'rgb(' + rVal + ',' + gVal + ',' + bVal + ')';
    $('.colorBox').css({'background-color': rgbVal});
    $('.rgbStatus').val(rgbVal);
    $('.page').css({flex: pageWidth});
    $('.colorBox').click(function() {
      $('.page').css({'background-color': rgbVal});
    });
    if (rgbSwitch) {
      $('.page').css({'background-color': rgbVal});
    }
    function rgb2hex(rgb) {
      rgb = rgbVal.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }
    $('.hexStatus').val(rgb2hex());
    if (hexSwitch) {
      $('.page').css({'background-color': hexVal});
      $('.colorBox').css({'background-color': hexVal});
    }
  }.observes('scaledDistThresholdR', 'scaledDistThresholdG', 'scaledDistThresholdB', 'pageWidth', 'rgbColor', 'colorInput', 'hexColor')
});
