import Ember from 'ember';

const {
  Controller,
  inject: { service },
  $
} = Ember;
export default Controller.extend({
  notifications: service(),

  actions: {

  },

  // full screen mode //
  mode: undefined,
  watchMode: function() {
    $('.sidebar, .page-header').toggleClass('none');
  }.observes('mode'),

  // background-color modifying //
  colorRGB: 'rgb(255,255,255)',
  colorInput: '#ffffff',
  rgbColor: undefined,
  hexColor: undefined,
  colorLight: 255,
  colorR: 255,
  colorG: 255,
  colorB: 255,

  colorChange: function() {
    var rVal = this.get('colorR');
    var gVal = this.get('colorG');
    var bVal = this.get('colorB');
    var hexVal = this.get('colorInput');
    var rgbSwitch = this.get('rgbColor');
    var hexSwitch = this.get('hexColor');
    var rgbVal = 'rgb(' + rVal + ',' + gVal + ',' + bVal + ')';
    $('.colorBox').css({
      'background-color': rgbVal
    });
    $('.rgbStatus').val(rgbVal);
    $('.colorBox').click(function() {
      $('.page').css({
        'background-color': rgbVal
      });
    });
    if (rgbSwitch) {
      $('.page').css({
        'background-color': rgbVal
      });
    }
    // rgb to hex translation //
    function rgb2hex(rgb) {
      rgb = rgbVal.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }
    $('.hexStatus').val(rgb2hex());
    if (hexSwitch) {
      $('.page').css({
        'background-color': hexVal
      });
      $('.colorBox').css({
        'background-color': hexVal
      });
    }
  }.observes('colorR', 'colorG', 'colorB', 'rgbColor', 'colorInput', 'hexColor'),

  // white & black values //
  brightnessChange: function() {
    var lightVal = this.get('colorLight');
    var rgbSwitch = this.get('rgbColor');
    var rgbVal = 'rgb(' + lightVal + ',' + lightVal + ',' + lightVal + ')';
    $('.colorBox').css({
      'background-color': rgbVal
    });
    $('.rgbStatus').val(rgbVal);
    $('.colorBox').click(function() {
      $('.page').css({
        'background-color': rgbVal
      });
    });
    if (rgbSwitch) {
      $('.page').css({
        'background-color': rgbVal
      });
    }

    function rgb2hex(rgb) {
      rgb = rgbVal.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }
    $('.hexStatus').val(rgb2hex());
  }.observes('colorLight'),

  // page width modifier //
  pageWidth: '0.75',
  changePageWidth: function() {
    var pageWidth = this.get('pageWidth');
    $('.page').css({
      flex: pageWidth
    });
  }.observes('pageWidth'),

  // #decafe //
  decafe: undefined,
  watchDecafe: function() {
    setInterval(function() {
      var r = Math.floor(Math.random() * 254) + 1;
      var g = Math.floor(Math.random() * 254) + 1;
      var b = Math.floor(Math.random() * 254) + 1;
      var de = 'rgb(' + r + ',' + g + ',' + b + ')';
      $('.page').css({
        'background-color': de
      });
    }, 30);
  }.observes('decafe')
});
