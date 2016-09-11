import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import <%= classifiedModuleName %>Mixin from '<%= dasherizedPackageName %>/mixins/<%= dasherizedModuleName %>';

describe('<%= classifiedModuleName %>Mixin', function() {
  it('works', function() {
    const <%= classifiedModuleName %>Obj = Ember.Object.extend(<%= classifiedModuleName %>Mixin);
    const subject = <%= classifiedModuleName %>Obj.create();
    expect(subject).to.be.ok;
  });
});
