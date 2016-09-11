import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('route:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Route', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
