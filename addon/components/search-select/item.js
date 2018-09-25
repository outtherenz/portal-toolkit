import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/search-select/item';

export default Component.extend({
  layout,

  displayName: computed('option', 'keys', 'separator', function() {
    const option = get(this, 'option');

    if (typeof option === 'string') return option;

    const keys = get(this, 'keys');
    const separator = get(this, 'separator');

    return keys.map(key => get(option, key)).join(separator);
  })
});
