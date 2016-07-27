import moment from 'moment';
import Ember from 'ember';
import _ from 'lodash';

export default function() {
  // Usually http://localhost:3000 during development.
  // Set PORTAL_API_URL env variable to change.
  this.urlPrefix = window.location.origin;

  // Conditionally passthrough everything
  if (false) {
    this.passthrough();
    return;
  }

  // Add a 400 ms delay to all requests during development
  this.timing = 400;

  // Just a little helper function to quickly mock all request types for a given resource
  const defineAll = route => {
    this.get(`/${route}`);
    this.get(`/${route}/:id`);
    this.post(`/${route}`);
    this.patch(`/${route}/:id`);
    this.del(`/${route}`);
  };

  // Define sets of endpoints for each resource type
  defineAll('accounts');
  defineAll('branches');
  defineAll('dashboard-modules');
  defineAll('groups');
  defineAll('kpis');
  defineAll('organisations');
  defineAll('users');

  // Define reporting endpoints
  this.get('/reports/balances', fakeReporter('balances'));
  this.get('/reports/kpis', fakeReporter('kpis'));

  // Allow requests to undefined routes to continue as normal
  this.passthrough();
}

// Generate fake balance and KPI reports
function fakeReporter(type) {
  return function(schema, { queryParams }) {
    const periods = buildPeriods(queryParams);
    const series = buildSeries(schema, queryParams, periods);
    const data = buildMetrics(type, schema, queryParams, series);

    populateReport(data);

    return { data };
  };
}

/*
 * Builds a collection of period objects, let the smallest component of a report.
 */
function buildPeriods(qp) {
  let currentPeriod = moment(qp.periodStart, 'YYYY-MM').endOf('month');
  const lastPeriod = moment(qp.periodEnd, 'YYYY-MM').endOf('month');
  const periods = [];

  // Generate an a list of dates to be included
  do {
    periods.push(currentPeriod.toDate().toISOString());
    currentPeriod = currentPeriod.add(1, 'month').endOf('month');
  } while (currentPeriod.isSameOrBefore(lastPeriod));

  // Turn that list into an empty data structure
  return periods.map(period => {
    period = {
      date: period,
      organisation: qp.organisation,
      periodTypes: {}
    };

    qp.periodTypes = qp.periodTypes || [];
    const includeMonth = qp.periodTypes.includes('month');
    const includeYTD = qp.periodTypes.includes('ytd');

    // Include month data if asked for, or as a default if nothing was asked for
    if (includeMonth || (!includeMonth && !includeYTD)) {
      period.periodTypes.month = { value: null };
    }

    // Only include YTD data if asked for explicitly
    if (includeYTD) {
      period.periodTypes.ytd = { value: null };
    }

    return period;
  });
}

/*
 * Builds a collection of series objects, representing branches and groups. Each of these
 * include a period object. They form the middle level of the report hierarchy.
 */
function buildSeries(schema, qp, periods) {
  const series = [];
  const branches = (qp.branch ? [ qp.branch ] : qp.branches) || [];
  const groups = (qp.group ? [ qp.group ] : qp.groups) || [];

  // Take the periods we generated earlier and use them to populate branch lists
  branches.forEach(branch => {
    series.push({
      branch,
      meta: { name: _.get(schema.branches.find(branch), 'name') },
      periods: _.cloneDeep(periods)
    });
  });

  groups.forEach(group => {
    series.push({
      group,
      meta: { name: _.get(schema.groups.find(group), 'name') },
      periods: _.cloneDeep(periods)
    });
  });

  return series;
}

/*
 * Builds a collection of metrics, the top level of the report heirarchy.
 */
function buildMetrics(type, schema, qp, series) {
  let metrics = qp.metrics || qp.accounts;

  if (Ember.isEmpty(metrics)) {
    if (type === 'balances') {
      metrics = schema.accounts.all().models.map(account => account.id);
    } else {
      metrics = schema.kpis.all().models.map(kpi => kpi.id);
    }
  }

  const schemaName = type === 'balances' ? 'accounts' : 'kpis';

  return (metrics || []).map(metric => {
    const record = schema[schemaName].find(metric);

    return {
      metric,
      meta: {
        _id: record.id,
        name: record.name,
        format: record.format
      },
      series: _.cloneDeep(series)
    };
  });
}

/*
 * Takes a complete, but empty, report structure and fills it with random values.
 */
function populateReport(metrics) {
  metrics.forEach(metric => {
    metric.series.forEach(s => {
      s.periods.forEach(period => {
        if (period.periodTypes.month) {
          if (metric.meta.format === 'PERCENTAGE') {
            period.periodTypes.month.value = Math.random();
          } else {
            period.periodTypes.month.value = Math.random() * Math.pow(10, 5);
          }
        }

        if (period.periodTypes.ytd) {
          if (metric.meta.format === 'PERCENTAGE') {
            period.periodTypes.ytd.value = Math.random();
          } else {
            period.periodTypes.ytd.value = Math.random() * Math.pow(10, 5);
          }
        }
      });
    });
  });
}
