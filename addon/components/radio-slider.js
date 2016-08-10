import Ember from 'ember';
import layout from '../templates/components/radio-slider';

const {
  Component
} = Ember;

export default Component.extend({
  layout,

  didInsertElement() {
    const radioWrapper = this.$('.radio-wrapper');
    const checkboxBox = this.$('.radio-box');

    const radioWrapperLength = this.$('.radio-wrapper label').length;
    const labelWidth = this.$('label').outerWidth();
    const labelHeight = this.$('label').outerHeight();

    radioWrapper.width(labelWidth * radioWrapperLength);
    radioWrapper.height(labelHeight);
    checkboxBox.height(labelHeight);
  }
});
