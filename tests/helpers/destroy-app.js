import Ember from 'ember';
/* global server */

export default function destroyApp(application) {
  Ember.run(application, 'destroy');
  server.shutdown();
}
