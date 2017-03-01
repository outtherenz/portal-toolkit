import Ember from 'ember';
import { formatDuration, parseDuration } from 'portal-toolkit/helpers/format-duration';

const {
  Controller,
  set
} = Ember;

export default Controller.extend({
  value1: 5.125,
  value2: 1.5,
  value3: 5,
  value4: 0.15,
  value5: 2.5,

  lateUpdated: Date.now(),

  formatDuration(value) {
    return formatDuration([ value ]);
  },

  parseDuration,

  actions: {
    updateValue(value) {
      set(this, 'value3', value);
      set(this, 'lastUpdated', Date.now());
    }
  }
});
