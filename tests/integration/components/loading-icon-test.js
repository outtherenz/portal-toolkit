import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | loading icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a ripple', async function(assert) {
    assert.expect(3);

    await render(hbs`{{loading-icon 'ripple'}}`);

    const icon = this.$().children('.loading-icon.loading-icon--ripple');
    assert.equal(icon.length, 1);

    const svg = icon.children('svg');
    assert.equal(svg.length, 1);

    const circles = svg.children('circle');
    assert.equal(circles.length, 4);
  });

  test('it renders a spinner', async function(assert) {
    assert.expect(3);

    await render(hbs`{{loading-icon 'spinner'}}`);

    const icon = this.$().children('.loading-icon.loading-icon--spinner');
    assert.equal(icon.length, 1);

    const svg = icon.children('svg');
    assert.equal(svg.length, 1);

    const circles = svg.children('circle');
    assert.equal(circles.length, 1);
  });
});
