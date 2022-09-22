import Controller from '@ember/controller';
import {computed } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Controller.extend({
  notifications: service(),

  actions: {

  },

  // full screen mode //
  mode: undefined,

  watchMode: computed('mode', function() {
    $('.sidebar, .page-header').toggleClass('none');
  }),

  // background-color modifying //
  colorRGB: 'rgb(255,255,255)',
  colorInput: '#ffffff',
  rgbColor: undefined,
  hexColor: undefined,
  colorLight: 255,
  colorR: 255,
  colorG: 255,
  colorB: 255,



  colorChange: computed('colorR', 'colorG', 'colorB', 'rgbColor', 'colorInput', 'hexColor', function() {

    var rVal = this.colorR;
    var gVal = this.colorG;
    var bVal = this.colorB;
    var hexVal = this.colorInput;
    var rgbSwitch = this.rgbColor;
    var hexSwitch = this.hexColor;
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
  }),

  // white & black values //
  brightnessChange: computed('colorLight', function() {
    var lightVal = this.colorLight;
    var rgbSwitch = this.rgbColor;
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
  }),

  // page width modifier //
  pageWidth: '0.75',

  changePageWidth: computed('pageWidth', function() {
    var pageWidth = this.pageWidth;
    $('.page').css({
      flex: pageWidth
    });
  }),

  // #decafe //
  decafe: undefined,
  watchDecafe: computed('decafe', function() {
    setInterval(function() {
      var r = Math.floor(Math.random() * 254) + 1;
      var g = Math.floor(Math.random() * 254) + 1;
      var b = Math.floor(Math.random() * 254) + 1;
      var de = 'rgb(' + r + ',' + g + ',' + b + ')';
      $('.page').css({
        'background-color': de
      });
    }, 30);
  })
});
