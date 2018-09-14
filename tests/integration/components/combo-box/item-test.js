import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';

moduleForComponent('combo-box/item', 'Integration | Component | combo box/item', {
  integration: true,
  beforeEach() {
    set(this, 'option', {
      name: 'Apple',
      code: '001',
      address: '123 Fake Street'
    });
    set(this, 'searchKeys', [ 'name', 'code', 'address' ]);
    // TODO this should be imported
    set(this, 'getDisplayName', function(keys, option, separator) {
      return keys.reduce((name, key, i) =>
        i > 0 ? name += `${separator ? separator : ' - '}${get(option, key)}` :
          name = get(option, key)
        , '');
    });
  }
});

test('it renders with the correct text', function(assert) {
  this.render(hbs`
    {{combo-box/item
      index=0
      selectedRow=0
      option=option
      searchKeys=searchKeys
      getDisplayName=getDisplayName
    }}
  `);

  assert.equal(this.$().text().trim(), 'Apple - 001 - 123 Fake Street');
});
