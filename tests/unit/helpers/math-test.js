import { expect } from 'chai';
import { describe, it } from 'mocha';
import { math } from 'portal-toolkit/helpers/math';

describe('MathHelper', function() {
  it('can do addition', function() {
    expect(math([ 1, '+', 1 ])).to.equal(2);
    expect(math([ -1, '+', 5 ])).to.equal(4);
    expect(math([ -9, '+', -3 ])).to.equal(-12);
    expect(math([ Infinity, '+', 1 ])).to.equal(Infinity);
    expect(math([ NaN, '+', NaN ])).to.be.NaN;
  });

  it('can do subtraction', function() {
    expect(math([ 1, '-', 1 ])).to.equal(0);
    expect(math([ -1, '-', 5 ])).to.equal(-6);
    expect(math([ -9, '-', -3 ])).to.equal(-6);
    expect(math([ Infinity, '-', 1 ])).to.equal(Infinity);
    expect(math([ NaN, '-', NaN ])).to.be.NaN;
  });

  it('can do multiplication', function() {
    expect(math([ 1, '*', 1 ])).to.equal(1);
    expect(math([ -1, '*', 5 ])).to.equal(-5);
    expect(math([ -9, '*', -3 ])).to.equal(27);
    expect(math([ Infinity, '*', 1 ])).to.equal(Infinity);
    expect(math([ NaN, '*', NaN ])).to.be.NaN;
  });

  it('can do division', function() {
    expect(math([ 1, '/', 1 ])).to.equal(1);
    expect(math([ 5, '/', -1 ])).to.equal(-5);
    expect(math([ -9, '/', -3 ])).to.equal(3);
    expect(math([ Infinity, '/', 1 ])).to.equal(Infinity);
    expect(math([ 1, '/', Infinity ])).to.equal(0);
    expect(math([ NaN, '/', NaN ])).to.be.NaN;
  });

  it('throws if the operator in invalid', function() {
    expect(() => math([ 1, 2 ])).to.throw();
    expect(() => math()).to.throw();
  });
});
