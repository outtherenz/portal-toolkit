import Ember from 'ember';
import layout from '../templates/components/month-picker';
import moment from 'moment';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  layout,

  // YYYY-MM string containing the selected period
  period: null,

  classNames: [ 'month-picker' ],
  classNameBindings: [ 'closedPeriod' ],

  selectedMonth: computed('period', {
    get() {
      return get(this, 'period').substr(5);
    },
    set(key, value) {
      const current = get(this, 'period');
      set(this, 'period', current.substr(0, 5) + value);
      return value;
    }
  }),

  selectedYear: computed('period', {
    get() {
      const period = get(this, 'period');
      return typeof period === 'string' ? period.substr(0, 4) : String(moment().year());
    },
    set(key, year) {
      const current = moment(get(this, 'period'), 'YYYY-MM');
      const month = current.isValid() ? current.format('MM') : moment().format('MM');
      year = moment(year, 'YYYY').isValid() ? String(year) : moment().format('YYYY');

      set(this, 'period', `${year}-${month}`);

      return year;
    }
  }),

  yearList: computed('period', function() {
    const selected = moment(get(this, 'period').substr(0, 4), 'YYYY');
    let start = moment([moment().year() - 8]);
    let end = moment([moment().year() + 2]);

    if (selected.diff(start, 'years', true) < 2) {
      start = selected.subtract(2, 'years');
    } else if (selected.diff(end, 'years', true) > -2) {
      end = selected.add(2, 'years');
    }

    const list = [];
    let current = start;

    do {
      list.push(current.format('YYYY'));
      current = current.add(1, 'year');
    } while (current.isBefore(end) || current.isSame(end));

    return list;
  }),

  actions: {
    prevYear() {
      const current = get(this, 'period');
      const prev = moment(current, 'YYYY-MM').subtract(1, 'year').format('YYYY-MM');
      set(this, 'period', prev);
    },

    prevMonth() {
      const current = get(this, 'period');
      const prev = moment(current, 'YYYY-MM').subtract(1, 'month').format('YYYY-MM');
      set(this, 'period', prev);
    },

    nextMonth() {
      const current = get(this, 'period');
      const prev = moment(current, 'YYYY-MM').add(1, 'month').format('YYYY-MM');
      set(this, 'period', prev);
    },

    nextYear() {
      const current = get(this, 'period');
      const prev = moment(current, 'YYYY-MM').add(1, 'year').format('YYYY-MM');
      set(this, 'period', prev);
    }
  }
});
