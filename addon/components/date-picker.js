import Component from '@ember/component';
import { on } from '@ember/object/evented';
import {
  getProperties,
  observer,
  computed,
  set,
  get
} from '@ember/object';
import layout from '../templates/components/date-picker';
import moment from 'moment';

export default Component.extend({
  classNames: [ 'date-picker' ],

  layout,

  date: new Date(),

  selection: computed('date', {
    get() {
      const date = this.date || new Date();

      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      };
    },

    set(key, { day, month, year }) {
      set(this, 'date', moment().year(year).month(month).date(day).toDate());
    }
  }),

  calendarState: {
    month: null,
    year: null
  },

  showSelection: on('init', observer('selection.{month,year}', function() {
    set(this, 'calendarState.month', get(this, 'selection.month'));
    set(this, 'calendarState.year', get(this, 'selection.year'));
  })),

  calendar: computed('calendarState.{day,month,year}', function() {
    const calendarState = this.calendarState;
    const { month, year } = getProperties(calendarState || {}, 'month', 'year');

    if (month == null || year == null) {
      return [];
    }

    const startOfMonth = moment()
    .year(get(this, 'calendarState.year'))
    .month(get(this, 'calendarState.month'))
    .startOf('month');

    const calendar = [];

    let offset = startOfMonth.day();

    for (let week = 0; week < 6; week++) {
      calendar[week] = [];

      for (; calendar[week].length < 7; offset--) {
        const date = moment(startOfMonth).subtract(offset, 'days');

        calendar[week].push({
          day: date.date(),
          month: date.month(),
          year: date.year()
        });
      }
    }

    return calendar;
  }),

  actions: {
    changeMonth(diff) {
      const calendarState = this.calendarState;
      const { month, year } = getProperties(calendarState || {}, 'month', 'year');

      if (month == null || year == null) {
        return;
      }

      const newDate = moment().year(year).month(month).add(diff, 'months');

      set(this, 'calendarState', {
        month: newDate.month(),
        year: newDate.year()
      });
    },

    makeSelection({ day, month, year }) {
      this.sendAction('select', moment().year(year).month(month).date(day).toDate());
    }
  }
});
