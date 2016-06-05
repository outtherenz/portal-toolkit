/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { formatNumber } from 'portal-toolkit/helpers/format-number';

const NEG = '\u2212\u2009';
const DASH = '\u2013';

describe('FormatNumberHelper', function() {
  it('formats strings correctly', function() {
    expect(formatNumber('1.2')).equals('1.20');
    expect(formatNumber('3.009')).equals('3.01');
    expect(formatNumber('-0.005')).equals('0.00');
    expect(formatNumber('0.00001')).equals('0.00');
    expect(formatNumber('100')).equals('100.00');
    expect(formatNumber('$2')).equals('2.00');
    expect(formatNumber('0')).equals(DASH);
    expect(formatNumber('-')).equals(DASH);
    expect(formatNumber(DASH)).equals(DASH);
    expect(formatNumber('-100')).equals(NEG + '100.00');
    expect(formatNumber(NEG + '1')).equals(NEG + '1.00');
  });

  it('formats numbers correctly', function() {
    expect(formatNumber(2.2)).equals('2.20');
    expect(formatNumber(3.009)).equals('3.01');
    expect(formatNumber(-0.005)).equals('0.00');
    expect(formatNumber(0.0000)).equals(DASH);
    expect(formatNumber(3e-50)).equals('0.00');
    expect(formatNumber(100)).equals('100.00');
    expect(formatNumber(-100)).equals(NEG + '100.00');
    expect(formatNumber(2e21)).equals('#');
    expect(formatNumber(0)).equals(DASH);
  });

  it('accepts places and sigfigs options', function() {
    expect(formatNumber(32.6, { places: 0 })).equals('33');
    expect(formatNumber(-0.02, { places: 0 })).equals('0');
    expect(formatNumber(32456.623123, { places: 6 })).equals('32,456.623,123');
    expect(formatNumber(12345, { sigfigs: 2 })).equals('12,000');
    expect(formatNumber(-1234, { sigfigs: 2 })).equals(NEG + '1,200');
    expect(formatNumber(12.345, { sigfigs: 3 })).equals('12.3');
    expect(formatNumber(1234.56789, { sigfigs: 8 })).equals('1,234.567,9');
  });

  it('formats NaNs correctly', function() {
    expect(formatNumber(NaN)).equals('');
    expect(formatNumber(null)).equals('');
    expect(formatNumber(undefined)).equals('');
    expect(formatNumber('')).equals('');
    expect(formatNumber('asdf')).equals('');
  });

  describe('Flags', function() {
    const opt = { flags: true, places: 0 };

    it('adds proper flags to null', function() {
      const res = formatNumber(null, opt);
      expect(res.isNaN).equals(true);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(false);
      expect(res.isNegative).equals(false);
    });

    it('adds proper flags to 0', function() {
      const res = formatNumber(0, opt);
      expect(res.isNaN).equals(true);
      expect(res.isZero).equals(true);
      expect(res.roundsToZero).equals(true);
      expect(res.isNegative).equals(false);
    });

    it('adds proper flags to 1', function() {
      const res = formatNumber(1, opt);
      expect(res.isNaN).equals(false);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(false);
      expect(res.isNegative).equals(false);
    });

    it('adds proper flags to -1', function() {
      const res = formatNumber(-1, opt);
      expect(res.isNaN).equals(false);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(false);
      expect(res.isNegative).equals(true);
    });

    it('adds proper flags to 0.1', function() {
      const res = formatNumber(0.1, opt);
      expect(res.isNaN).equals(false);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(true);
      expect(res.isNegative).equals(false);
    });

    it('adds proper flags to -0.1', function() {
      const res = formatNumber(-0.1, opt);
      expect(res.isNaN).equals(false);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(true);
      expect(res.isNegative).equals(false);
    });

    it('adds proper flags to 1e50', function() {
      const res = formatNumber(1e50, opt);
      expect(res.isNaN).equals(true);
      expect(res.isZero).equals(false);
      expect(res.roundsToZero).equals(false);
      expect(res.isNegative).equals(false);
    });
  });

  it('obeys the dash zero option', function() {
    const opt = { sigfigs: 2, dashZero: false };

    expect(formatNumber(0, opt)).equals('0.0');
    expect(formatNumber(1, opt)).equals('1.0');
    expect(formatNumber(0.001, opt)).equals('0.0');
  });
});
