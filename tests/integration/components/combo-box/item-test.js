import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

moduleForComponent('combo-box/item', 'Integration | Component | combo box/item', {
  integration: true,
  beforeEach() {
    set(this, 'option', {
      name: 'Apple',
      code: '001',
      address: '123 Fake Street'
    });
    set(this, 'key', 'name');
  }
});

test('it renders with the correct text', function(assert) {
  this.render(hbs`
    {{combo-box/item
      index=0
      selectedRow=0
      option=option
      key=key
    }}
  `);

  assert.equal(this.$().text().trim(), 'Apple');
});
