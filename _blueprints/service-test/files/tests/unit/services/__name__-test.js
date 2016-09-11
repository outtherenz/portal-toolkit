import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('service:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Service', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
