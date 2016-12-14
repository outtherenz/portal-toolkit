import Ember from 'ember';
import layout from '../templates/components/loading-button';

const { Component, computed, get } = Ember;

export default Component.extend({
  layout,

  tagName: 'button',
  classNames: [ 'button' ],
  classNameBindings: [ 'isLoading:loading' ],
  attributeBindings: [ 'disabled' ],

  buttonText: 'Submit',
  isLoading: false,
  isDisabled: false,

  disabled: computed.or('isLoading', 'isDisabled'),

  click(event) {
    event.preventDefault();

    if (!get(this, 'isLoading')) {
      // Maintain current width
      var el = this.$()[0];
      el.style.minWidth = getComputedStyle(el).width;
      el.style.minHeight = getComputedStyle(el).height;

      if (get(this, 'action')) {
        this.sendAction();
      }
    }
  }
});
