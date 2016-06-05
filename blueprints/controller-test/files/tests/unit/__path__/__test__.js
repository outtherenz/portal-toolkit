import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('controller:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Controller', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
