import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set, get } from '@ember/object';

module('Integration | Component | search select/item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    set(this, 'option', {
      name: 'Apple',
      code: '001',
      address: '123 Fake Street'
    });
    set(this, 'keys', [ 'name' ]);
    set(this, 'getDisplayName', (keys, option, separator) => {
      return keys.reduce((name, key, i) =>
        i > 0 ? name += `${separator ? separator : ' - '}${get(option, key)}` :
          name = get(option, key)
        , '');
    });
  });

  test('it renders with the correct text', async function(assert) {
    await render(hbs`
      {{search-select/item
        index=0
        selectedRow=0
        option=option
        keys=keys
        getDisplayName=getDisplayName
      }}
    `);

    assert.dom(this.element).hasText('Apple');
  });
});
