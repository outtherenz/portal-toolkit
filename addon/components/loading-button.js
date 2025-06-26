import { or } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/loading-button';

export default Component.extend({
  layout,

  tagName: 'button',
  classNames: ['loading-button'],
  classNameBindings: ['isLoading:loading'],
  attributeBindings: ['disabled'],

  buttonText: 'Submit',
  isLoading: false,
  isDisabled: false,

  disabled: or('isLoading', 'isDisabled'),

  click(event) {
    event.preventDefault();

    if (!get(this, 'isLoading')) {
      // Maintain current width
      var el = $(this.element)[0];
      el.style.minWidth = getComputedStyle(el).width;
      el.style.minHeight = getComputedStyle(el).height;

      if (this.action) {
        this.action();
      }
    }
  },
});
