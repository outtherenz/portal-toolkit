import { run } from '@ember/runloop';
/* global server */

export default function destroyApp(application) {
  run(application, 'destroy');
  server.shutdown();
}
