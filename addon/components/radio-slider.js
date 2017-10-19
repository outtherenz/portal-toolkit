import Ember from 'ember';
import layout from '../templates/components/radio-slider';

const {
  Component,
  $
} = Ember;

export default Component.extend({
  layout,

  classNames: [ 'radio-slider' ],

  didInsertElement() {
    this._super(...arguments);
    this.equaliseLabelWidths();
  },

  equaliseLabelWidths() {
    const widths = this.$('label').map(function() {
      return $(this).width();
    }).toArray();

    const maxWidth = widths.reduce((max, width) => width > max ? width : max, 0);

    this.$('label').forEach(function() {
      $(this).width(maxWidth);
    });
  }
});
