import { expect } from 'chai';
import { describe, it } from 'mocha';
import { <%= camelizedModuleName %> } from '<%= dasherizedPackageName %>/helpers/<%= dasherizedModuleName %>';

describe('<%= classifiedModuleName %>Helper', function() {
  it('works', function() {
    expect(<%= camelizedModuleName %>(42)).to.be.ok;
  });
});
