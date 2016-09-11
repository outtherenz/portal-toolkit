import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('transform:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Transform', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
