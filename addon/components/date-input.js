import Component from '@ember/component';
import { next } from '@ember/runloop';
import moment from 'moment';
import $ from 'jquery';
import { set, get, observer } from '@ember/object';
import layout from '../templates/components/date-input';

export default Component.extend({
  layout,

  placeholder: 'Please select a Date',

  classNames: [ 'date-input' ],

  isActive: false,
  format: 'dddd, D MMMM YYYY',

  didInsertElement() {
    const element = this.elementId;
    $(window).on('keydown keyup click blur', event => {
      const { target, key } = event;
      const isTarget = $(`#${element}`).is(target);
      const hasTarget = $(`#${element}`).has(target).length !== 0;

      if (isTarget || hasTarget) {
        if (['Enter', 'Escape'].includes(key)) {
          set(this, 'isActive', false);
          event.preventDefault();
        }
      } else if (this.isActive) {
        set(this, 'isActive', false);
      }
    });
  },

  willDestroyElement() {
    // remove our listener
    $(window).off('keydown keyup click blur');
  },

  focusDateInput: observer('isActive', function() {
    if (this.isActive) next(() => this.$('input').focus());
  }),

  actions: {
    selectAndDeactivate(date) {
      this.toggleProperty('isActive');
      this.sendAction('select', date);
    },
    handleDateInput(value) {
      const date = moment(value, 'YYYY-MM-DD').toDate();

      if (date.getTime()) this.sendAction('select', date);
    }
  }
});
