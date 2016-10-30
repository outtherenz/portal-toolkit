
import { ordinalFor } from 'dummy/helpers/ordinal-for';
import { module, test } from 'qunit';

module('Unit | Helper | ordinal for');

test('it returns st when it should', function(assert) {
  assert.equal(ordinalFor(1), 'st');
  assert.equal(ordinalFor(21), 'st');
  assert.equal(ordinalFor(31), 'st');
  assert.equal(ordinalFor(101), 'st');
  assert.equal(ordinalFor(123451), 'st');
  assert.notEqual(ordinalFor(11), 'st');
});

test('it returns nd when it should', function(assert) {
  assert.equal(ordinalFor(2), 'nd');
  assert.equal(ordinalFor(22), 'nd');
  assert.equal(ordinalFor(32), 'nd');
  assert.equal(ordinalFor(102), 'nd');
  assert.equal(ordinalFor(123452), 'nd');
  assert.notEqual(ordinalFor(12), 'nd');
});

test('it returns rd when it should', function(assert) {
  assert.equal(ordinalFor(3), 'rd');
  assert.equal(ordinalFor(23), 'rd');
  assert.equal(ordinalFor(33), 'rd');
  assert.equal(ordinalFor(103), 'rd');
  assert.equal(ordinalFor(123453), 'rd');
  assert.notEqual(ordinalFor(13), 'rd');
});

test('it returns th when it should', function(assert) {
  assert.equal(ordinalFor(0), 'th');
  assert.equal(ordinalFor(4), 'th');
  assert.equal(ordinalFor(9), 'th');
  assert.equal(ordinalFor(10), 'th');
  assert.equal(ordinalFor(11), 'th');
  assert.equal(ordinalFor(12), 'th');
  assert.equal(ordinalFor(13), 'th');
  assert.equal(ordinalFor(14), 'th');
  assert.equal(ordinalFor(24), 'th');
  assert.equal(ordinalFor(104), 'th');
});

test('it returns nothing when it should', function(assert) {
  assert.equal(ordinalFor(-1), null);
  assert.equal(ordinalFor(1.5), null);
  assert.equal(ordinalFor(Infinity), null);
  assert.equal(ordinalFor(5e100), null);
});
