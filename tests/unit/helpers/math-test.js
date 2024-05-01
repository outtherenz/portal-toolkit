import { math } from 'dummy/helpers/math';
import { module, test } from 'qunit';

module('Unit | Helper | math', function() {
  test('it can do addition', function(assert) {
    assert.equal(math([ 1, '+', 1 ]), 2);
    assert.equal(math([ '1', '+', '1' ]), 2);
    assert.equal(math([ -1, '+', 5 ]), 4);
    assert.equal(math([ -9, '+', -3 ]), -12);
    assert.equal(math([ Infinity, '+', 1 ]), Infinity);
    assert.throws(() => math([ NaN, '+', NaN ]));
  });

  test('it can do subtraction', function(assert) {
    assert.equal(math([ 1, '-', 1 ]), 0);
    assert.equal(math([ -1, '-', 5 ]), -6);
    assert.equal(math([ -9, '-', -3 ]), -6);
    assert.equal(math([ Infinity, '-', 1 ]), Infinity);
    assert.throws(() => math([ NaN, '-', NaN ]));
  });

  test('it can do multiplication', function(assert) {
    assert.equal(math([ 1, '*', 1 ]), 1);
    assert.equal(math([ -1, '*', 5 ]), -5);
    assert.equal(math([ -9, '*', -3 ]), 27);
    assert.equal(math([ Infinity, '*', 1 ]), Infinity);
    assert.throws(() => math([ NaN, '*', NaN ]));
  });

  test('it can do division', function(assert) {
    assert.equal(math([ 1, '/', 1 ]), 1);
    assert.equal(math([ 5, '/', -1 ]), -5);
    assert.equal(math([ -9, '/', -3 ]), 3);
    assert.equal(math([ Infinity, '/', 1 ]), Infinity);
    assert.equal(math([ 1, '/', Infinity ]), 0);
    assert.throws(() => math([ NaN, '/', NaN ]));
  });

  test('it throws if the operator in invalid', function(assert) {
    assert.throws(() => math([ 1, 2 ]));
    assert.throws(() => math());
    math([ 1, '/', 1 ]);
  });
});
