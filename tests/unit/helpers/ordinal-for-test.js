import { expect } from 'chai';
import { describe, it } from 'mocha';
import { ordinalFor } from 'portal-toolkit/helpers/ordinal-for';

describe('OrdinalForHelper', function() {
  it('returns st when it should', function() {
    expect(ordinalFor(1)).to.equal('st');
    expect(ordinalFor(21)).to.equal('st');
    expect(ordinalFor(31)).to.equal('st');
    expect(ordinalFor(101)).to.equal('st');
    expect(ordinalFor(123451)).to.equal('st');
    expect(ordinalFor(11)).to.not.equal('st');
  });

  it('returns nd when it should', function() {
    expect(ordinalFor(2)).to.equal('nd');
    expect(ordinalFor(22)).to.equal('nd');
    expect(ordinalFor(32)).to.equal('nd');
    expect(ordinalFor(102)).to.equal('nd');
    expect(ordinalFor(123452)).to.equal('nd');
    expect(ordinalFor(12)).to.not.equal('nd');
  });

  it('returns rd when it should', function() {
    expect(ordinalFor(3)).to.equal('rd');
    expect(ordinalFor(23)).to.equal('rd');
    expect(ordinalFor(33)).to.equal('rd');
    expect(ordinalFor(103)).to.equal('rd');
    expect(ordinalFor(123453)).to.equal('rd');
    expect(ordinalFor(13)).to.not.equal('rd');
  });

  it('returns th when it should', function() {
    expect(ordinalFor(0)).to.equal('th');
    expect(ordinalFor(4)).to.equal('th');
    expect(ordinalFor(9)).to.equal('th');
    expect(ordinalFor(10)).to.equal('th');
    expect(ordinalFor(11)).to.equal('th');
    expect(ordinalFor(12)).to.equal('th');
    expect(ordinalFor(13)).to.equal('th');
    expect(ordinalFor(14)).to.equal('th');
    expect(ordinalFor(24)).to.equal('th');
    expect(ordinalFor(104)).to.equal('th');
  });

  it('returns nothing when it should', function() {
    expect(ordinalFor(-1)).to.be.null;
    expect(ordinalFor(1.5)).to.be.null;
    expect(ordinalFor(Infinity)).to.be.null;
    expect(ordinalFor(5e100)).to.be.null;
  });
});
