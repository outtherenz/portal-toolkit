import Ember from 'ember';
import layout from '../templates/components/date-picker';
import moment from 'moment';

const {
  Component,
  on,
  get,
  set,
  computed,
  observer,
  getProperties
} = Ember;

export default Component.extend({
  classNames: [ 'date-picker' ],

  layout,

  selection: {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  },

  calendarState: {
    month: null,
    year: null
  },

  showSelection: on('init', observer('selection.{month,year}', function() {
    set(this, 'calendarState.month', get(this, 'selection.month'));
    set(this, 'calendarState.year', get(this, 'selection.year'));
  })),

  calendar: computed('calendarState.{day,month,year}', function() {
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

        calendar[week].pushObject({
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
      const calendarState = get(this, 'calendarState');
      const { month, year } = getProperties(calendarState, 'month', 'year');
      const newDate = moment().year(year).month(month).add(diff, 'months');

      set(this, 'calendarState', {
        month: newDate.month(),
        year: newDate.year()
      });
    }
  }
});
