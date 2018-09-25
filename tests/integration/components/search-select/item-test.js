import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set, get } from '@ember/object';

moduleForComponent('search-select/item', 'Integration | Component | search select/item', {
  integration: true,
  beforeEach() {
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
  }
});

test('it renders with the correct text', function(assert) {
  this.render(hbs`
    {{search-select/item
      index=0
      selectedRow=0
      option=option
      keys=keys
      getDisplayName=getDisplayName
    }}
  `);

  assert.equal(this.$().text().trim(), 'Apple');
});
