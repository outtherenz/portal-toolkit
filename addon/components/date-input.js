import Component from '@ember/component';
import { next } from '@ember/runloop';
import $ from 'jquery';
import moment from 'moment';
import { set, observer } from '@ember/object';
import layout from '../templates/components/date-input';

export default Component.extend({
  layout,

  placeholder: 'Please select a Date',

  classNames: ['date-input'],

  isActive: false,
  format: 'dddd, D MMMM YYYY',

  didInsertElement() {
    this._super(...arguments);
    const element = this.elementId;
    $(window).on('keydown keyup click blur', (event) => {
      const { target, key } = event;
      const isTarget = $(`#${element}`).is(target);
      const hasTarget = $(`#${element}`).has(target).length !== 0;

      if (isTarget || hasTarget) {
        if (['Enter', 'Escape'].includes(key)) {
          set(this, 'isActive', false);
          event.preventDefault();
        }
      } else if (get(this, 'isActive')) {
        set(this, 'isActive', false);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    // remove our listener
    $(window).off('keydown keyup click blur');
  },

  focusDateInput: observer('isActive', function () {
    if (this.isActive) next(() => this.element.querySelector('input').focus());
  }),

  actions: {
    selectAndDeactivate(date) {
      this.toggleProperty('isActive');
      this.select(date);
    },
    handleDateInput(value) {
      const date = moment(value.target.value, 'YYYY-MM-DD').toDate();
      if (date.getTime()) this.select(date);
    },
    toggle() {
      this.toggleProperty('isActive');
    },
  },
});
