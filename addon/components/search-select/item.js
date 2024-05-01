import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/search-select/item';

export default Component.extend({
  layout,

  displayName: computed('option', 'keys', 'separator', function() {
    const option = this.option;

    if (typeof option === 'string') return option;

    const keys = this.keys;
    const separator = this.separator;

    return keys.map(key => get(option, key)).join(separator);
  })
});
