import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sortable-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SortableList />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <SortableList>
        template block text
      </SortableList>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});

test('it renders all our content correctly', function(assert) {
  assert.expect(7);

  this.render(hbs`{{sortable-list content=content property='name'}}`);
  assert.equal(this.$(' li').length, 6);
  assert.equal(this.$('ol li:nth-child(1)').text(), 'john');
  assert.equal(this.$('ol li:nth-child(2)').text(), 'ben');
  assert.equal(this.$('ol li:nth-child(3)').text(), 'greg');
  assert.equal(this.$('ol li:nth-child(4)').text(), 'fraser');
  assert.equal(this.$('ol li:nth-child(5)').text(), 'janyk');
  assert.equal(this.$('ol li:nth-child(6)').text(), 'steve');
});

test('it uses the `value` key if no property name is provided', function(assert) {
  assert.expect(7);

  this.render(hbs`{{sortable-list content=content}}`);
  assert.equal(this.$('ol li').length, 6);
  assert.equal(this.$('ol li:nth-child(1)').text(), '1');
  assert.equal(this.$('ol li:nth-child(2)').text(), '2');
  assert.equal(this.$('ol li:nth-child(3)').text(), '3');
  assert.equal(this.$('ol li:nth-child(4)').text(), '4');
  assert.equal(this.$('ol li:nth-child(5)').text(), '5');
  assert.equal(this.$('ol li:nth-child(6)').text(), '6');
});

test('it renders an empty list if not provided with any content', function(assert) {
  assert.expect(2);

  this.render(hbs`{{sortable-list property='name'}}`);
  assert.equal(this.$('ol').length, 1);
  assert.equal(this.$('ol li').length, 0);
});

skip('reorders content when items are dragged and dropped');
