import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duration input', function(hooks) {
  setupRenderingTest(hooks);

  test('inits with defualt placeholder', async function(assert) {
    await render(hbs`{{duration-input duration=duration}}`);
    assert.dom('input').hasAttribute('placeholder', '0:00');
  });

  test('inits with dash placeholder', async function(assert) {
    await render(hbs`{{duration-input duration=duration placeholder='–'}}`);
    assert.dom('input').hasAttribute('placeholder', '–');
  });

  test('formats on init', async function(assert) {
    await render(hbs`{{duration-input duration='5.75'}}`);
    assert.dom('input').hasValue('5:45');
  });

  test('formats on blur', async function(assert) {
    await render(hbs`{{duration-input duration=duration}}`);
    await fillIn('input', '3:30').blur();

    return settled().then(() => {
      assert.dom('input').hasValue('3:30');
      assert.equal(this.duration, 3.5);
    });
  });

  test('reformats when value is updated', async function(assert) {
    await render(hbs`{{duration-input duration=duration}}`);

    return settled().then(() => {
      this.set('duration', 6.75);
    }).then(() => {
      assert.dom('input').hasValue('6:45');
    });
  });
});
