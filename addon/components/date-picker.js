import Ember from 'ember';
import layout from '../templates/components/date-picker';
import moment from 'moment';

const {
  Component,
  get,
  set,
  computed,
  getProperties
} = Ember;

export default Component.extend({
  classNames: [ 'date-picker' ],

  layout,

  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),

  date: computed('day', 'month', 'year', function() {
    const { day, month, year } = getProperties(this, 'day', 'month', 'year');
    const date = moment().date(day).month(month).year(year).toDate();

    return date;
  }),

  calendar: computed('day', 'month', 'year', function() {
    const startOfMonth = moment(get(this, 'date')).startOf('month');
    const calendar = [];

    console.log(startOfMonth.format())

    let offset = startOfMonth.day()

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
  })
});
