import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import { formatNumber } from 'portal-toolkit/helpers/format-number';
import fakeReporter from '../../../mirage/fake-reporter';
/* global server */

moduleForComponent('charts', 'Integration | Component | charts', {
  integration: true,

  before() {
    startMirage(this.container);
  },

  beforeEach() {
    startMirage();

    const metrics = fakeReporter('balances')(server.schema, {
      queryParams: {
        branches: [ '1' ],
        accounts: [ '1' ],
        periodStart: '2015-04',
        periodEnd: '2016-03'
      }
    }).data;

    const series = [ server.schema.branches.find(1) ];

    const period = {
      start: '2015-04',
      end: '2016-03',
      type: 'month'
    };

    this.set('metrics', metrics);
    this.set('series', series);
    this.set('period', period);
  },

  after() {
    server.shutdown();
  }
});

test('it renders data-table component', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/data-table series=series metrics=metrics period=period}}`);

  assert.equal(this.$('table tr td')[0].firstChild.data, 'Sales');
});

test('it fills in data-table properly', function(assert) {
  assert.expect(2);

  this.render(hbs`{{charts/data-table series=series metrics=metrics period=period}}`);
  
  assert.equal(this.$('table tr td')[0].firstChild.data, 'Sales');
  
  const metrics = this.get('metrics');
  const expected = formatNumber([ 'currency', metrics[0].series[0].periods[0].periodTypes['month'].value ]);

  assert.equal(this.$('td.text-right').text(), expected);
});

test('it renders line-chart component', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/line-chart series=series metrics=metrics period=period}}`);

  assert.equal(this.$('.c3').length, 1);
});
test('it fills in line-chart data properly', function(assert) {
  assert.expect(2);

  const metrics = this.get('metrics');
  
  metrics[0].series[0].periods.forEach((period, index) => {
    period.periodTypes.month.value = index;
  });
  
  this.set('metrics', metrics);
  this.render(hbs`{{charts/line-chart series=series metrics=metrics period=period}}`);
  
  const portion1 = this.$('.c3-shape-1')[0].cy.animVal.value;
  const portion2 = this.$('.c3-shape-2')[0].cy.animVal.value;
  const portion3 = this.$('.c3-shape-3')[0].cy.animVal.value;
  
  assert.ok(portion1 > portion2);
  assert.ok(portion2 > portion3);
});

test('it renders pie-chart component', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/pie-chart series=series metrics=metrics period=period}}`);

  assert.equal(this.$('.c3-arc-Sales').length, 1);
});

test('it fills in pie-chart data properly', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/pie-chart series=series metrics=metrics period=period}}`);

  const metrics = this.get('metrics');
  const temp = metrics[0].series[0].periods[0].periodTypes['month'].value;

  assert.equal(this.$('.c3-arc-Sales')[0].__data__.value, temp);
});

test('it renders gauge-chart component', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/gauge-chart series=series metrics=metrics period=period}}`);

  assert.equal(this.$('.c3-arc-Sales').length, 1);
});

test('it fills in gauge-chart data properly', function(assert) {
  assert.expect(1);

  this.render(hbs`{{charts/gauge-chart series=series target=80 metrics=metrics period=period}}`);
  
  const metrics = this.get('metrics');
  const temp = metrics[0].series[0].periods[0].periodTypes['month'].value;
  
  assert.equal(this.$('.c3-arc-Sales')[0].__data__.value, temp / 80);
});