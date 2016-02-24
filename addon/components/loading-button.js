import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isLoading:loading'],
  attributeBindings: ['isDisabled:disabled'],
  tagName: 'button',

  buttonText: 'No label provided',
  isLoading: false,
  isDisabled: false,

  disabled: Ember.computed.or('isLoading', 'isDisabled'),

  click(event) {
    event.preventDefault();

    if (!this.get('isLoading')) {
      // Maintain current width
      var el = this.$()[0];
      el.style.minWidth = getComputedStyle(el).width;
      el.style.minHeight = getComputedStyle(el).height;

      if (this.get('action')) {
        this.sendAction();
      }
    }
  }
});
