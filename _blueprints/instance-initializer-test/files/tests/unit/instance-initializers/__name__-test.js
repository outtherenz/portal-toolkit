import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import { initialize } from '<%= dasherizedPackageName %>/instance-initializers/<%= dasherizedModuleName %>';

const { run, Application } = Ember;

describe('<%= classifiedModuleName %>InstanceInitializer', function() {
  let appInstance;

  beforeEach(function() {
    run(function() {
      const application = Application.create();
      appInstance = application.buildInstance();
    });
  });

  it('works', function() {
    initialize(appInstance);

    // Confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
