import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel('<%= dasherizedModuleName %>', '<%= classifiedModuleName %>', {<%= typeof needs !== 'undefined' ? ` ${needs} ` : '' %>}, function() {
  it('exists', function() {
    const model = this.subject();
    const store = this.store();
    expect(model).to.be.ok;
  });
});
