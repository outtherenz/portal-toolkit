import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';
import { formatPercentage } from 'portal/helpers/fmt-percentage';
import { formatNumber } from 'portal/helpers/fmt-number';
import { formatCurrency } from 'portal/helpers/fmt-currency';
import moment from 'moment';

export default C3Chart.extend({
  classNames: ['dashboard-module', 'line-chart'],

  data: Ember.computed('metrics', 'series', function() {
    const periodType = this.get('period.type');
    const dates = [];
    const seriesMeta = this.get('series');
    const metrics = this.get('metrics');
    const series = Ember.isArray(metrics) ? metrics[0].series : metrics.series;
    const columns = [];

    if (!series) {
      Ember.Logger.warn('No series provided to line chart component.');
      return;
    }

    const start = moment(this.get('period.start'), 'YYYY-MM').endOf('month').toDate();
    const end = moment(this.get('period.end'), 'YYYY-MM').endOf('month').toDate();
    let currentPeriod = start;

    while (currentPeriod <= end) {
      dates.push(currentPeriod);
      currentPeriod = moment(currentPeriod).add(1, 'month').endOf('month').toDate();
    }

    seriesMeta.forEach((meta, seriesIndex) => {
      const thisSeries = series.find(s => s.branch === meta.get('id') || s.group === meta.get('id')) || {};
      const periods = thisSeries.periods || [];
      columns.pushObject([ meta.get('name') ]);

      dates.forEach((date, periodIndex) => {
        const period = periods.find(p => p.date === date.toISOString());
        const value = period ? Ember.get(period, `periodTypes.${periodType}.value`) : null;
        columns[seriesIndex][periodIndex + 1] = value != null ? value : null;
        currentPeriod = moment(currentPeriod).add(1, 'month').endOf('month').toDate();
      });
    });

    columns.unshift(['Periods', ...dates]);

    return {
      x: 'Periods',
      columns
    };
  }),

  axis: Ember.computed('metrics', function() {
    const metrics = this.get('metrics');
    const meta = Ember.isArray(metrics) ? metrics[0].meta : metrics.meta;
    let label;
    let reduction;
    let yAxisPlaces = 0;

    if (meta.format === 'PERCENTAGE') {
      label = meta.name;
    } else {
      const series = Ember.isArray(metrics) ? metrics[0].series : metrics.series;

      let longest = 0;

      series.forEach(thisSeries => {
        thisSeries.periods.forEach(period => {
          if (period.value > longest) {
            longest = period.value;
          }
        });
      });

      const longestLength = Math.floor(longest).toString().length;
      const setsOfThree = Math.ceil(longestLength / 3) - 1;
      reduction = Math.pow(10, setsOfThree * 3);
      let reductionText;

      yAxisPlaces = longestLength % 3 === 1 ? 1 : 0;

      switch (setsOfThree) {
        case 1:
          reductionText = 'thousands';
          break;
        case 2:
          reductionText = 'millions';
          break;
        case 3:
          reductionText = 'billions';
          break;
        case 4:
          reductionText = 'trillions';
          break;
        default:
          if (setsOfThree) {
            reductionText = '⨉ ' + reduction;
          }
          break;
      }

      if (reductionText) {
        label = `${meta.name} (${reductionText})`;
      } else {
        label = meta.name;
      }
    }

    return {
      x: {
        type: 'timeseries',
        tick: {
          format: function(tick) {
            return moment(tick).format('MMM-YY');
          }
        }
      },
      y: {
        label: {
          text: label,
          position: 'outer-middle'
        },
        tick: {
          format: function(tick) {
            if (meta.format === 'PERCENTAGE') {
              return formatPercentage(tick, { sigfigs: 2, dashZero: false });
            } else {
              return formatNumber(tick / reduction, { places: yAxisPlaces, dashZero: false });
            }
          }
        }
      }
    };
  }),

  size: {
    height: 220
  },

  grid: {
    x: { show: false },
    y: { show: true }
  },

  tooltip: Ember.computed('metrics', function() {
    const metrics = this.get('metrics');
    const meta = Ember.isArray(metrics) ? metrics[0].meta : metrics.meta;

    return {
      show: true,
      format: {
        title: date => moment(date).format('MMMM YYYY'),
        value: function(value) {
          if (meta.format === 'PERCENTAGE') {
            return formatPercentage(value, { sigfigs: 2, dashZero: false });
          } else if (meta.format === 'CURRENCY') {
            return formatCurrency(value, { places: 0, dashZero: false });
          }
        }
      }
    };
  }),

  legend: { position: 'bottom' }
});
