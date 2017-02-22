import { formatDuration, parseDuration } from 'dummy/helpers/format-duration';
import { module, test } from 'qunit';

module('Unit | Helper | format duration');

// Shorthands
const f = value => formatDuration([ value ]);
const p = value => parseDuration(value);

// Replace this with your real tests.
test('it formats normal values correctly', function(assert) {
  assert.equal(f(1), '1:00', 'integer');
  assert.equal(f(1.5), '1:30', 'float');
  assert.equal(f(2.000001), '2:00', 'rounding');
  assert.equal(f(0), '–', 'zero');
  assert.equal(f(-1.5), '-1:30', 'negative');
});

test('it formats null and error values correctly', function(assert) {
  assert.equal(f(null), '–', 'null');
  assert.equal(f(undefined), '–', 'undefined');
  assert.equal(f('abc'), '–', 'abc');
});

test('it parses normal values correctly', function(assert) {
  assert.equal(p('1:00'), 1, 'integer');
  assert.equal(p('2:45'), 2.75, 'float');
  assert.equal(p('-2:45'), -2.75, 'negative');
  assert.equal(p('0:00'), 0, 'zero');
});

test('it parses shorthand values correctly', function(assert) {
  assert.equal(p('1'), 1, 'integer');
  assert.equal(p('2:6'), 2.1, 'short minutes');
  assert.equal(p('-2'), -2, 'negative integer');
  assert.equal(p(':30'), 0.5, 'only minutes');
  assert.equal(p(':90'), 1.5, 'high minutes');
});

test('it parses null and error values correctly', function(assert) {
  assert.equal(p(''), null, 'empty string');
  assert.equal(p(null), null, 'null');
  assert.equal(p(undefined), null, 'undefined');
  assert.equal(p('abc'), null, 'invalid');
  assert.equal(p(':'), null, 'lone colon');
});
