import fakeReporter from './fake-reporter';

// import { discoverEmberDataModels } from "ember-cli-mirage";
// import { createServer } from 'miragejs';
export default function() {

  // let finalConfig = {
  //   ...config,
  //   models: { ...discoverEmberDataModels(), ...config.models },
  //   routes,
  // };

  // return createServer(finalConfig);
  // Add a 400 ms delay to all requests during development
  this.timing = 400;

  // Just a little helper function to quickly mock all request types for a given resource
  const defineAll = route => {
    this.get(`/${route}`);
    this.get(`/${route}/:id`);
    this.post(`/${route}`);
    this.patch(`/${route}/:id`);
    this.del(`/${route}`);
  };

  // Define sets of endpoints for each resource type
  defineAll('accounts');
  defineAll('branches');
  defineAll('dashboard-modules');
  defineAll('groups');
  defineAll('kpis');
  defineAll('organisations');
  defineAll('users');

  // Define reporting endpoints
  this.get('/reports/balances', fakeReporter('balances'));
  this.get('/reports/kpis', fakeReporter('kpis'));

  // Allow requests to undefined routes to continue as normal
  this.passthrough();
}


function routes() {
  this.namespace = '/api'

 // this.resource('user')
}