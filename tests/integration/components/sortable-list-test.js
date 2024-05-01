import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sortable list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    var content = [
      { name: 'john', value: '1' },
      { name: 'ben', value: '2' },
      { name: 'greg', value: '3' },
      { name: 'fraser', value: '4' },
      { name: 'janyk', value: '5' },
      { name: 'steve', value: '6' }
    ];

    this.set('content', content);
  });

  test('it renders all our content correctly', async function(assert) {
    assert.expect(7);

    await render(hbs`{{sortable-list content=content property='name'}}`);
    assert.dom(' li').exists({ count: 6 });
    assert.dom('ol li:nth-child(1)').hasText('john');
    assert.dom('ol li:nth-child(2)').hasText('ben');
    assert.dom('ol li:nth-child(3)').hasText('greg');
    assert.dom('ol li:nth-child(4)').hasText('fraser');
    assert.dom('ol li:nth-child(5)').hasText('janyk');
    assert.dom('ol li:nth-child(6)').hasText('steve');
  });

  test('it uses the `value` key if no property name is provided', async function(assert) {
    assert.expect(7);

    await render(hbs`{{sortable-list content=content}}`);
    assert.dom('ol li').exists({ count: 6 });
    assert.dom('ol li:nth-child(1)').hasText('1');
    assert.dom('ol li:nth-child(2)').hasText('2');
    assert.dom('ol li:nth-child(3)').hasText('3');
    assert.dom('ol li:nth-child(4)').hasText('4');
    assert.dom('ol li:nth-child(5)').hasText('5');
    assert.dom('ol li:nth-child(6)').hasText('6');
  });

  test('it renders an empty list if not provided with any content', async function(assert) {
    assert.expect(2);

    await render(hbs`{{sortable-list property='name'}}`);
    assert.dom('ol').exists({ count: 1 });
    assert.dom('ol li').doesNotExist();
  });

  skip('reorders content when items are dragged and dropped');
});
