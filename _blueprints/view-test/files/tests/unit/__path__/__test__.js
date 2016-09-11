import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('view:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>View', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
