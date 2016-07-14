import Ember from 'ember';
import layout from '../templates/components/radio-slider';

export default Ember.Component.extend({
  layout,

  generator: undefined,

  didInsertElement() {
    // generator //
    this.set('generator', Math.floor(Math.random() * (999 - 1) + 1));
    // dimensions //
    var radioWrapper = this.$('.radio-wrapper');
    var checkboxBox = this.$('.radio-box');
    var radioWrapperLength = this.$('.radio-wrapper label').length;
    var labelWidth = this.$('label').outerWidth();
    var labelHeight = this.$('label').outerHeight();
    radioWrapper.width(labelWidth * radioWrapperLength);
    radioWrapper.height(labelHeight);
    checkboxBox.height(labelHeight);
  }
});
