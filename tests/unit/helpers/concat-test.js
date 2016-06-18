import { expect } from 'chai';
import { describe, it } from 'mocha';
import { concat } from 'portal-toolkit/helpers/concat';

describe('ConcatHelper', function() {
  it('concats two strings', function() {
    expect(concat('a', 'b')).to.equal('ab');
  });

  it('concats two numbers', function() {
    expect(concat(1, 2)).to.equal('12');
  });

  it('concats more than two items', function() {
    expect(concat('a', 'b', 'c')).to.equal('abc');
    expect(concat('a', 1, 'b', 2)).to.equal('a1b2');
  });

  it('treats null values as empty strings', function() {
    expect(concat(1, null, 'a')).to.equal('1a');
  });
});
