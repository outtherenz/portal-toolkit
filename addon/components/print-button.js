import Component from '@ember/component';
import $ from 'jquery';
import { run } from '@ember/runloop';
import layout from '../templates/components/print-button';

export default Component.extend({
  layout,

  tagName: 'button',
  classNames: [ 'print-button' ],
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
