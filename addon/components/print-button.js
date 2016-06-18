import Ember from 'ember';
import layout from '../templates/components/print-button';

const { Component, $, run } = Ember;

export default Component.extend({
  layout,

  tagName: 'button',
  classNames: [ 'subdued' ],
  attributeBindings: [ 'title' ],

  title: 'Print',

  click() {
    $('.dashboard-row').css('width', '950px');
    $(window).resize();
    run.next(() => {
      window.print();
      $('.dashboard-row').css('width', 'auto');
      $(window).resize();
    });
  }
});
