import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import { initialize } from '<%= dasherizedPackageName %>/initializers/<%= dasherizedModuleName %>';

const { run, Application } = Ember;

describe('<%= classifiedModuleName %>Initializer', function() {
  let container, application;

  beforeEach(function() {
    run(function() {
      application = Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  });

  it('works', function() {
    initialize(container, application);

    // Confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
