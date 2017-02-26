import Ember from 'ember';
import { formatDuration, parseDuration } from 'portal-toolkit/helpers/format-duration';

const {
  TextField,
  get,
  set
} = Ember;

export default TextField.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    const duration = get(this, 'duration');

    set(this, 'value', formatDuration([ duration ]));
  },

  focusOut() {
    this._super(...arguments);

    const value = get(this, 'value');
    const duration = parseDuration(value);

    set(this, 'duration', duration);
  }
});
