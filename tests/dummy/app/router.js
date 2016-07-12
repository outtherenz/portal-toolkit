import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('app-components', function() {
    this.route('active-table');
    this.route('charts');
    this.route('checkbox-list');
    this.route('file-inputs');
    this.route('formatted-input');
    this.route('loading-button');
    this.route('loading-icon');
    this.route('month-picker');
    this.route('notification-container');
    this.route('notification-message');
    this.route('print-button');
    this.route('radio-slider');
    this.route('sortable-list');
    this.route('untethered-modal-dialog');
    this.route('value-change-indicator');
  });

  this.route('helpers', function() {
    this.route('concat');
    this.route('format-number');
    this.route('math');
  });

  this.route('404', { path: '*path' });
});

export default Router;
