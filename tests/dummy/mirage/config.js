import fakeReporter from './fake-reporter';
import { discoverEmberDataModels } from "ember-cli-mirage";
import { createServer } from 'miragejs';
// export default function(config) {
//   let finalConfig = {
//     ...config,
//     models: { ...discoverEmberDataModels(), ...config.models },
//     routes() {
//       this.resource('accounts');
//       this.resource('accounts/:id');
//       this.resource('branches');
//       this.resource('branches/:id');
//       this.resource('dashboard-modules');
//       this.resource('dashboard-modules/:id');
//       this.resource('groups');
//       this.resource('groups/:id');
//       this.resource('kpis');
//       this.resource('kpis/:id');
//       this.resource('organisations');
//       this.resource('organisations/:id');
//       this.resource('users');
//       this.resource('users/:id');
//     },
//   };

//   return createServer(finalConfig);
// }


export default function() {
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

