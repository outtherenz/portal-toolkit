import Ember from 'ember';
import layout from '../templates/components/radio-slider';

export default Ember.Component.extend({
  layout,

  generator: Math.random() * 999 + 1,
  generatorName: Math.random() * 666 + 1,

  didInsertElement() {
    // fallback
    var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    var isSafari = navigator.userAgent.indexOf('Safari') > -1;
    var isBlendMode = typeof window.getComputedStyle(document.body).backgroundBlendMode === 'undefined';
     // Safari flex width 100% rejection
    // IE flex width 100% & mixed blend mode rejection
    if (isBlendMode || isSafari && isChrome === false) {
      this.$('label').addClass('no-background-blend-mode');
      this.$('span').addClass('no-background-blend-mode');
    }

    // dimensions
    var radioWrapper = this.$('.radio-wrapper');
    var overlay = this.$('span.overlay');
    var radioWrapperLength = this.$('.radio-wrapper label').length;
    var labelWidth = this.$('label').outerWidth();
    var labelHeight = this.$('label').outerHeight();
    radioWrapper.width(labelWidth * radioWrapperLength - 1);
    overlay.width(labelWidth).height(labelHeight);

    // moving label
    var items = this.$('input');
    this.labelPositionChange();
    items.change(() => this.labelPositionChange());
  },

  labelPositionChange() {
    var overlay = this.$('span.overlay');
    var selectedInput = this.$('input.field:checked');
    if (!selectedInput[0]) return;
    var labelPosition = selectedInput.next().position();
    this.$(overlay).css({left: labelPosition.left, top: labelPosition.top});
  }
});
