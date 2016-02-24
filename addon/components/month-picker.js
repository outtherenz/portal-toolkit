import Ember from 'ember';
import layout from '../templates/components/month-picker';
import moment from 'moment';

export default Ember.Component.extend({
  layout,

  classNames: [ 'month-picker' ],
  period: null,

  checkPeriod: Ember.on('init', function() {
    if (!moment(this.get('period'), 'YYYY-MM').isValid()) {
      throw new Error('Date should be provided in YTD format');
    }
  }),

  selectedMonth: Ember.computed('period', {
    get: function() {
      return this.get('period').substr(5);
    },
    set: function(key, value) {
      const current = this.get('period');
      this.set('period', current.substr(0, 5) + value);
      return value;
    }
  }),

  selectedYear: Ember.computed('period', {
    get: function() {
      return this.get('period').substr(0, 4);
    },
    set: function(key, value) {
      const current = this.get('period');
      this.set('period', value + current.substr(4));
      return value;
    }
  }),

  yearList: Ember.computed('period', function() {
    const selected = moment(this.get('period').substr(0, 4), 'YYYY');
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
      const current = this.get('period');
      const prev = moment(current, 'YYYY-MM').subtract(1, 'year').format('YYYY-MM');
      this.set('period', prev);
    },

    prevMonth() {
      const current = this.get('period');
      const prev = moment(current, 'YYYY-MM').subtract(1, 'month').format('YYYY-MM');
      this.set('period', prev);
    },

    nextMonth() {
      const current = this.get('period');
      const prev = moment(current, 'YYYY-MM').add(1, 'month').format('YYYY-MM');
      this.set('period', prev);
    },

    nextYear() {
      const current = this.get('period');
      const prev = moment(current, 'YYYY-MM').add(1, 'year').format('YYYY-MM');
      this.set('period', prev);
    }
  }
});
