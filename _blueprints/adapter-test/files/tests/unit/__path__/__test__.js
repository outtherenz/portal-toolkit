import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('adapter:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Adapter', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
