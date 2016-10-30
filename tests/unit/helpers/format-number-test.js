import { formatNumber } from 'dummy/helpers/format-number';
import { module, test } from 'qunit';

const NEG = '\u2212\u2009';
const DASH = '\u2013';
const opt = { flags: true, places: 0 };

module('Unit | Helper | format number');

test('it formats strings correctly', function(assert) {
  assert.equal(formatNumber('1.2'), '1.20');
  assert.equal(formatNumber('3.009'), '3.01');
  assert.equal(formatNumber('-0.005'), '0.00');
  assert.equal(formatNumber('0.00001'), '0.00');
  assert.equal(formatNumber('100'), '100.00');
  assert.equal(formatNumber('$2'), '2.00');
  assert.equal(formatNumber('0'), DASH);
  assert.equal(formatNumber('-'), DASH);
  assert.equal(formatNumber(DASH), DASH);
  assert.equal(formatNumber('-100'), NEG + '100.00');
  assert.equal(formatNumber(NEG + '1'), NEG + '1.00');
});

test('it formats numbers correctly', function(assert) {
  assert.equal(formatNumber(2.2), '2.20');
  assert.equal(formatNumber(3.009), '3.01');
  assert.equal(formatNumber(-0.005), '0.00');
  assert.equal(formatNumber(0.0000), DASH);
  assert.equal(formatNumber(3e-50), '0.00');
  assert.equal(formatNumber(100), '100.00');
  assert.equal(formatNumber(-100), NEG + '100.00');
  assert.equal(formatNumber(2e21), '#');
  assert.equal(formatNumber(0), DASH);
});

test('it accepts places and sigfigs options', function(assert) {
  assert.equal(formatNumber(32.6, { places: 0 }), '33');
  assert.equal(formatNumber(-0.02, { places: 0 }), '0');
  assert.equal(formatNumber(32456.623123, { places: 6 }), '32,456.623,123');
  assert.equal(formatNumber(12345, { sigfigs: 2 }), '12,000');
  assert.equal(formatNumber(-1234, { sigfigs: 2 }), NEG + '1,200');
  assert.equal(formatNumber(12.345, { sigfigs: 3 }), '12.3');
  assert.equal(formatNumber(1234.56789, { sigfigs: 8 }), '1,234.567,9');
});

test('it formats NaNs correctly', function(assert) {
  assert.equal(formatNumber(NaN), '');
  assert.equal(formatNumber(null), '');
  assert.equal(formatNumber(undefined), '');
  assert.equal(formatNumber(''), '');
  assert.equal(formatNumber('asdf'), '');
});

test('it handles percentage formatting correctly', function(assert) {
  assert.equal(formatNumber([ 'percentage', 0.5 ]), '50.00%');
  assert.equal(formatNumber([ 'percentage', -0.5 ]), NEG + '50.00%');
  assert.equal(formatNumber([ 'percentage', null ]), '');
  assert.equal(formatNumber([ 'percentage', false ]), '');
  assert.equal(formatNumber([ 'percentage', undefined ]), '');
  assert.equal(formatNumber([ 'percentage', 0.4 ], { flags: true }).parsedInput, 0.4);
});

test('it handles currency formatting correctly', function(assert) {
  assert.equal(formatNumber([ 'currency', 0.5 ]), '$0.50');
  assert.equal(formatNumber([ 'currency', -0.5 ]), NEG + '$0.50');
  assert.equal(formatNumber([ 'currency', null ]), '');
  assert.equal(formatNumber([ 'currency', false ]), '');
  assert.equal(formatNumber([ 'currency', undefined ]), '');
});

test('it adds proper flags to null', function(assert) {
  const res = formatNumber(null, opt);
  assert.ok(res.isNaN);
  assert.notOk(res.isZero);
  assert.notOk(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it adds proper flags to 0', function(assert) {
  const res = formatNumber(0, opt);
  assert.ok(res.isNaN);
  assert.ok(res.isZero);
  assert.ok(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it adds proper flags to 1', function(assert) {
  const res = formatNumber(1, opt);
  assert.notOk(res.isNaN);
  assert.notOk(res.isZero);
  assert.notOk(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it adds proper flags to -1', function(assert) {
  const res = formatNumber(-1, opt);
  assert.notOk(res.isNaN);
  assert.notOk(res.isZero);
  assert.notOk(res.roundsToZero);
  assert.ok(res.isNegative);
});

test('it adds proper flags to 0.1', function(assert) {
  const res = formatNumber(0.1, opt);
  assert.notOk(res.isNaN);
  assert.notOk(res.isZero);
  assert.ok(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it adds proper flags to -0.1', function(assert) {
  const res = formatNumber(-0.1, opt);
  assert.notOk(res.isNaN);
  assert.notOk(res.isZero);
  assert.ok(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it adds proper flags to 1e50', function(assert) {
  const res = formatNumber(1e50, opt);
  assert.ok(res.isNaN);
  assert.notOk(res.isZero);
  assert.notOk(res.roundsToZero);
  assert.notOk(res.isNegative);
});

test('it obeys the dash zero option', function(assert) {
  const opt = { sigfigs: 2, dashZero: false };

  assert.equal(formatNumber(0, opt), '0.0');
  assert.equal(formatNumber(1, opt), '1.0');
  assert.equal(formatNumber(0.001, opt), '0.0');

  // Shouldn't dash falsey values
  assert.equal(formatNumber(null, opt), '');
  assert.equal(formatNumber(false, opt), '');
  assert.equal(formatNumber(undefined, opt), '');
});

test('it obeys the currency symbol option', function(assert) {
  const opt = {};

  // Empty string
  opt.currencySymbol = '';
  assert.equal(formatNumber([ 'currency', 3.5 ], opt), '3.50');

  // Falsey
  opt.currencySymbol = null;
  assert.equal(formatNumber([ 'currency', 3.5 ], opt), '3.50');

  // Actual other symbol
  opt.currencySymbol = '£';
  assert.equal(formatNumber([ 'currency', 9 ], opt), '£9.00');

  // Other formats shouldn't be affected
  assert.equal(formatNumber([ 'percentage', 0.5 ], opt), '50.00%');
  assert.equal(formatNumber([ 'number', 25 ], opt), '25.00');
});
