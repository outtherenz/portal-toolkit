/* eslint-disable array-callback-return */
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('app-components', function() {
    this.route('active-table');
    this.route('charts');
    this.route('checkbox-list');
    this.route('date-input');
    this.route('date-picker');
    this.route('file-inputs');
    this.route('formatted-input');
    this.route('loading-button');
    this.route('loading-icon');
    this.route('month-picker');
    this.route('notification-container');
    this.route('notification-message');
    this.route('overlaid-dropdown');
    this.route('print-button');
    this.route('radio-slider');
    this.route('sortable-list');
    this.route('modal-dialog');
    this.route('value-change-indicator');
    this.route('combo-box');
    this.route('combo-button');
    this.route('search-select');
  });

  this.route('helpers', function() {
    this.route('concat');
    this.route('format-number');
    this.route('math');
  });
  this.route('services', function() {
    this.route('notifications');
  });

  this.route('404', { path: '*path' });
});

export default Router;
