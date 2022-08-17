import { isArray } from '@ember/array';
import { get, computed } from '@ember/object';
import { warn } from '@ember/debug';
import C3Chart from 'ember-c3/components/c3-chart';
import { formatNumber } from 'portal-toolkit/helpers/format-number';
import moment from 'moment';

export default C3Chart.extend({
  classNames: [ 'chart', 'chart--line' ],

  data: computed('metrics', 'series', 'period', function() {
    const periodType = get(this, 'period.type');
    const dates = [];
    const seriesMeta = this.series;
    const metrics = this.metrics;
    const series = isArray(metrics) ? metrics[0].series : metrics.series;
    const columns = [];

    if (!series) {
      warn('No series provided to line chart component.');
      return;
    }

    const start = moment(get(this, 'period.start'), 'YYYY-MM').endOf('month').toDate();
    const end = moment(get(this, 'period.end'), 'YYYY-MM').endOf('month').toDate();
    let currentPeriod = start;

    while (currentPeriod <= end) {
      dates.push(currentPeriod);
      currentPeriod = moment(currentPeriod).add(1, 'month').endOf('month').toDate();
    }

    seriesMeta.forEach((meta, seriesIndex) => {
      const thisSeries = series.find(s => s.entity === get(meta, 'id') || s.group === get(meta, 'id')) || {};
      const periods = thisSeries.periods || [];
      columns.pushObject([ get(meta, 'name') ]);

      dates.forEach((date, periodIndex) => {
        const period = periods.find(p => p.date === date.toISOString());
        const value = period ? get(period, `periodTypes.${periodType}.value`) : null;
        columns[seriesIndex][periodIndex + 1] = value == null ? null : value;
        currentPeriod = moment(currentPeriod).add(1, 'month').endOf('month').toDate();
      });
    });

    columns.unshift(['Periods', ...dates]);

    return {
      x: 'Periods',
      columns
    };
  }),

  axis: computed('metrics', function() {
    const metrics = this.metrics;
    const meta = isArray(metrics) ? metrics[0].meta : metrics.meta;
    let label;
    let reduction;
    let yAxisPlaces = 0;
    const periodType = get(this, 'period.type');

    if (meta.format === 'PERCENTAGE') {
      label = meta.name;
    } else {
      const series = isArray(metrics) ? metrics[0].series : metrics.series;

      let longest = 0;
      series.forEach(({ periods }) => {
        periods.forEach(period => {
          const current = period ? get(period, `periodTypes.${periodType}.value`) : null;
          if (current > longest) {
            longest = current;
          }
        });
      });

      const longestLength = Math.floor(longest).toString().length;
      const setsOfThree = Math.ceil(longestLength / 3) - 1;
      reduction = Math.pow(10, setsOfThree * 3);
      let reductionText;

      yAxisPlaces = longestLength % 3 === 1 ? 3 - longestLength : 0;

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
          format(tick) {
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
          format(tick) {
            if (meta.format === 'PERCENTAGE') {
              return formatNumber([ 'percentage', tick ], { places: 2, dashZero: false });
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

  tooltip: computed('metrics', function() {
    const metrics = this.metrics;
    const meta = isArray(metrics) ? metrics[0].meta : metrics.meta;

    return {
      show: true,
      format: {
        title: date => moment(date).format('MMMM YYYY'),
        value(value) {
          if (meta.format === 'PERCENTAGE') {
            return formatNumber([ 'percentage', value ], { sigfigs: 4, dashZero: false });
          } else if (meta.format === 'CURRENCY') {
            return formatNumber([ 'currency', value ], { places: value >= 100 ? 0 : 2, dashZero: false });
          } else {
            const numberLength = Math.floor(value).toString().length;
            return formatNumber(value, { places: numberLength > 3 ? 0 : 3 - numberLength, dashZero: false });
          }
        }
      }
    };
  }),

  legend: { position: 'bottom' }
});
