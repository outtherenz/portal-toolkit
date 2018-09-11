import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('combo-box/item', 'Integration | Component | combo box/item', {
  integration: true
});

test('it renders with the correct text', function(assert) {
  this.render(hbs`
    {{combo-box/item
      index=0
      selectedRow=0
      name='Test'
    }}
  `);

  assert.equal(this.$().text().trim(), 'Test');
});
