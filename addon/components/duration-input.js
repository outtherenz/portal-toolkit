import TextField from '@ember/component/text-field';
import { set, get } from '@ember/object';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { formatDuration, parseDuration } from 'portal-toolkit/helpers/format-duration';

export default TextField.extend({
  placeholder: '0:00',

  didReceiveAttrs() {
    this._super(...arguments);

    const duration = get(this, 'duration');

    set(this, 'value', formatDuration([ duration ]));
  },

  focusOut() {
    this._super(...arguments);

    const value = get(this, 'value');
    const duration = parseDuration(value);

    if (this.onDurationChange) {
      this.onDurationChange(duration);
    } else {
      set(this, 'duration', duration);
    }
  },

  /**
   * Select all on focus, if selectOnFocus or editRawValue is true.
   * Does not allow the user to make their own selection.
   * http://stackoverflow.com/a/24589806/2833988
   */
  selectAll: on('focusIn', function() {
    const selectOnFocus = get(this, 'selectOnFocus');

    if (selectOnFocus) {
      this.$().on('click keyup', () => {
        run(() => this.$().off('click keyup').select());
      });
    }
  })
});
