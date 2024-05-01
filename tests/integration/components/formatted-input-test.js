import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  settled,
  find,
  findAll,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | formatted input', function(hooks) {
  setupRenderingTest(hooks);

  test('formats the initial value', async function(assert) {
    assert.expect(1);

    await render(hbs`{{formatted-input number=1000.009}}`);

    return settled().then(() => {
      assert.dom('input').hasValue('1,000.01');
    });
  });

  test('responds to source change', async function(assert) {
    assert.expect(2);

    this.set('number', 1.5);

    await render(hbs`{{formatted-input number=number}}`);

    settled().then(() => {
      assert.dom('input').hasValue('1.50');
      this.set('number', 5.2);
    });

    return settled().then(() => {
      assert.dom('input').hasValue('5.20');
    });
  });

  test('calls the update action if provided', async function(assert) {
    assert.expect(1);

    this.set('number', 1.5);
    this.set('update', value => assert.equal(value, 5, 'update action called'));

    await render(hbs`{{formatted-input number=number update=update}}`);

    return settled().then(() => {
      this.$('input').val('5').change().blur();
    });
  });

  test('reformats on blur when parsed value has changed', async function(assert) {
    assert.expect(1);

    this.set('number', 5);
    await render(hbs`{{formatted-input number=number}}`);

    return settled().then(() => {
      this.$('input').val('1000').change().blur();

      return settled();
    }).then(() => {
      assert.dom('input').hasValue('1,000.00');
    });
  });

  test('reformats on blur when parsed value has not changed', async function(assert) {
    assert.expect(1);

    this.set('number', 5);
    await render(hbs`{{formatted-input number=number}}`);

    settled().then(() => {
      this.$('input').val('5.00000').change().blur();
    });

    return settled().then(() => {
      assert.dom('input').hasValue('5.00');
    });
  });

  test('obeys the editRawValue option, or guesses if not provided', async function(assert) {
    assert.expect(5);

    await render(hbs`
      {{formatted-input number=1 editRawValue=true}}
      {{formatted-input number=2 editRawValue=false}}
      {{formatted-input number=3 format='number'}}
      {{formatted-input number=4 format='currency'}}
      {{formatted-input number=5 format='xyz'}}
    `);

    settled().then(async () => {
      await triggerEvent(find('input'), 'focusin');
      await triggerEvent(findAll('input')[1], 'focusin');
      await triggerEvent(findAll('input')[2], 'focusin');
      await triggerEvent(findAll('input')[3], 'focusin');
      await triggerEvent(findAll('input')[4], 'focusin');
    });

    return settled().then(() => {
      assert.dom('input').hasValue('1');
      assert.dom(findAll('input')[1]).hasValue('2.00');
      assert.dom(findAll('input')[2]).hasValue('3');
      assert.dom(findAll('input')[3]).hasValue('4');
      assert.dom(findAll('input')[4]).hasValue('5.00');
    });
  });

  test('obeys the selectOnFocus option', async function(assert) {
    if (navigator.userAgent.includes('Firefox')) {
      assert.expect(0);
      return;
    }

    assert.expect(3);

    await render(hbs`
      {{formatted-input number=1 editRawValue=false}}
      {{formatted-input number=2 editRawValue=false selectOnFocus=true}}
      {{formatted-input number=3 editRawValue=false selectOnFocus=false}}
    `);

    settled().then(async () => {
      await triggerEvent(find('input'), 'focusin').click();
    });

    settled().then(async () => {
      assert.equal(getSelection().toString(), '1.00');

      getSelection().empty();
      await triggerEvent(findAll('input')[1], 'focusin').click();
    });

    settled().then(async () => {
      assert.equal(getSelection().toString(), '2.00');

      getSelection().empty();
      await triggerEvent(findAll('input')[2], 'focusin').click();
    });

    return settled().then(() => {
      assert.equal(getSelection().toString(), '');
    });
  });

  test('handles other formats', async function(assert) {
    assert.expect(3);

    await render(hbs`
      {{formatted-input number=100 format='currency'}}
      {{formatted-input number=0.5 format='percentage'}}
      {{formatted-input number=100 format='integer'}}
    `);

    return settled().then(() => {
      assert.dom('input').hasValue('$100.00');
      assert.dom(findAll('input')[1]).hasValue('50.00%');
      assert.dom(findAll('input')[2]).hasValue('100');
    });
  });

  test('accepts custom formatters and parsers', async function(assert) {
    assert.expect(4);

    this.set('number', 1);
    this.set('formatter', (_, option) => option);
    this.set('formatterOptions', '2');
    this.set('parser', (_, option) => option);
    this.set('parserOptions', 3);

    await render(hbs`{{formatted-input
      number=number
      formatter=formatter
      formatterOptions=formatterOptions
      parser=parser
      parserOptions=parserOptions
    }}`);

    settled().then(() => {
      assert.dom('input').hasValue('2');
      assert.equal(this.number, 1);

      this.$('input').val('4').change().focusout();
    });

    return settled().then(() => {
      assert.dom('input').hasValue('2');
      assert.equal(this.number, 3);
    });
  });

  test('can deal with null values', async function(assert) {
    assert.expect(2);

    await render(hbs`{{formatted-input number=number}}`);

    settled().then(async () => {
      assert.dom('input').hasValue('');
      await triggerEvent('input', 'change').focusout();
    });

    return settled().then(() => {
      assert.equal(this.number, null);
    });
  });

  test('has the right class names', async function(assert) {
    assert.expect(2);

    await render(hbs`{{formatted-input format='xyz'}}`);

    return settled().then(() => {
      assert.dom('input').hasClass('formatted-input');
      assert.dom('input').hasClass('formatted-input--xyz');
    });
  });
});
