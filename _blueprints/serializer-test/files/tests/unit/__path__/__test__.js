import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('serializer:<%= dasherizedModuleName %>', '<%= classifiedModuleName %>Serializer', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });
});
