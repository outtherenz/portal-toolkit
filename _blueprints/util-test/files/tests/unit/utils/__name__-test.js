import { expect } from 'chai';
import { describe, it } from 'mocha';
import <%= camelizedModuleName %> from '<%= dasherizedPackageName %>/utils/<%= dasherizedModuleName %>';

describe('<%= camelizedModuleName %>', function() {
  it('works', function() {
    expect(<%= camelizedModuleName %>()).to.be.ok;
  });
});
