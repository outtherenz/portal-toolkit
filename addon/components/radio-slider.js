import Ember from 'ember';
import layout from '../templates/components/radio-slider';
const {$} = Ember;

export default Ember.Component.extend({
  layout,

  didInsertElement() {

    // fallback
    var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    var isSafari = navigator.userAgent.indexOf('Safari') > -1;
    var isBlendMode = typeof window.getComputedStyle(document.body).backgroundBlendMode === 'undefined';
     // Safari flex width 100% rejection
    // IE flex width 100% & mixed blend mode rejection
    if (isBlendMode || isSafari && isChrome === false) {
      this.$().find('label').addClass('no-background-blend-mode');
      this.$().find('span').addClass('no-background-blend-mode');
    }

    // dimensions
    var radioWrapper = this.$().find('.radio-wrapper');
    var overlay = this.$().find('span.overlay');
    var radioWrapperLength = this.$().find('.radio-wrapper label').length;
    var labelWidth = this.$().find('label').outerWidth();
    var labelHeight = this.$().find('label').outerHeight();
    radioWrapper.width(labelWidth * radioWrapperLength - 1);
    overlay.width(labelWidth).height(labelHeight);

    // moving label
    var items = $('input');
    function labelPositionChange() {
      var selectedInput = $('input.field:checked');
      var selectedLabel = $(selectedInput).next();
      var labelPosition = $(selectedLabel).position();
      $(overlay).css({left: labelPosition.left, top: labelPosition.top});
    }
    labelPositionChange();
    items.change(function() {
      labelPositionChange();
    });
  }
});
