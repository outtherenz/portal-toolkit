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

  thresholdChanged: function() {
    var rVal = this.get('scaledDistThresholdR');
    var gVal = this.get('scaledDistThresholdG');
    var bVal = this.get('scaledDistThresholdB');
    var hexVal = this.get('colorInput');
    var rgbSwitch = this.get('rgbColor');
    var hexSwitch = this.get('hexColor');
    var rgbVal = 'rgb(' + rVal + ',' + gVal + ',' + bVal + ')';
    $('.colorBox').css({'background-color': rgbVal});
    $('.rgbStatus').val(rgbVal);
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
  }.observes('scaledDistThresholdR', 'scaledDistThresholdG', 'scaledDistThresholdB', 'rgbColor', 'colorInput', 'hexColor'),

  pageWidth: '0.75',
  changePageWidth: function() {
    var pageWidth = this.get('pageWidth');
    $('.page').css({flex: pageWidth});
  }.observes('pageWidth'),

  decafe: undefined,
  watchDecafe: function() {
    setInterval(function() {
      var r = Math.floor(Math.random() * 254) + 1;
      var g = Math.floor(Math.random() * 254) + 1;
      var b = Math.floor(Math.random() * 254) + 1;
      var de = 'rgb(' + r + ',' + g + ',' + b + ')';
      $('.page').css({'background-color': de});
    }, 30);
  }.observes('decafe')
});
