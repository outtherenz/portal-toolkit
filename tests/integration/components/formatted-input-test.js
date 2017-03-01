import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('formatted-input', 'Integration | Component | formatted input', {
  integration: true
});

test('formats the initial value', function(assert) {
  assert.expect(1);

  this.render(hbs`{{formatted-input number=1000.009}}`);

  return wait().then(() => {
    assert.equal(this.$('input').val(), '1,000.01');
  });
});

test('responds to source change', function(assert) {
  assert.expect(2);

  this.set('number', 1.5);

  this.render(hbs`{{formatted-input number=number}}`);

  wait().then(() => {
    assert.equal(this.$('input').val(), '1.50');
    this.set('number', 5.2);
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '5.20');
  });
});

test('calls the update action if provided', function(assert) {
  assert.expect(1);

  this.set('number', 1.5);
  this.set('update', value => assert.equal(value, 5, 'update action called'));

  this.render(hbs`{{formatted-input number=number update=update}}`);

  return wait().then(() => {
    this.$('input').val('5').change().blur();
  });
});

test('reformats on blur when parsed value has changed', function(assert) {
  assert.expect(1);

  this.set('number', 5);
  this.render(hbs`{{formatted-input number=number}}`);

  return wait().then(() => {
    this.$('input').val('1000').change().blur();

    return wait();
  }).then(() => {
    assert.equal(this.$('input').val(), '1,000.00');
  });
});

test('reformats on blur when parsed value has not changed', function(assert) {
  assert.expect(1);

  this.set('number', 5);
  this.render(hbs`{{formatted-input number=number}}`);

  wait().then(() => {
    this.$('input').val('5.00000').change().blur();
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '5.00');
  });
});

test('obeys the editRawValue option', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{formatted-input number=1 editRawValue=true}}
    {{formatted-input number=2 editRawValue=false}}
  `);

  wait().then(() => {
    this.$('input:eq(0)').focusin();
    this.$('input:eq(1)').focusin();
  });

  return wait().then(() => {
    assert.equal(this.$('input:eq(0)').val(), '1');
    assert.equal(this.$('input:eq(1)').val(), '2.00');
  });
});

test('obeys the selectOnFocus option', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{formatted-input number=1 editRawValue=false selectOnFocus=true}}
    {{formatted-input number=2 editRawValue=false selectOnFocus=false}}
  `);

  wait().then(() => {
    this.$('input:eq(0)').focusin().click();
  });

  wait().then(() => {
    assert.equal(getSelection().toString(), '1.00');

    getSelection().empty();
    this.$('input:eq(1)').focusin().click();
  });

  return wait().then(() => {
    assert.equal(getSelection().toString(), '');
  });
});

test('handles other formats', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{formatted-input number=100 format='currency'}}
    {{formatted-input number=0.5 format='percentage'}}
    {{formatted-input number=100 format='integer'}}
  `);

  return wait().then(() => {
    assert.equal(this.$('input:eq(0)').val(), '$100.00');
    assert.equal(this.$('input:eq(1)').val(), '50.00%');
    assert.equal(this.$('input:eq(2)').val(), '100');
  });
});

test('accepts custom formatters and parsers', function(assert) {
  assert.expect(4);

  this.set('number', 1);
  this.set('formatter', (_, option) => option);
  this.set('formatterOptions', '2');
  this.set('parser', (_, option) => option);
  this.set('parserOptions', 3);

  this.render(hbs`{{formatted-input
    number=number
    formatter=formatter
    formatterOptions=formatterOptions
    parser=parser
    parserOptions=parserOptions
  }}`);

  wait().then(() => {
    assert.equal(this.$('input').val(), '2');
    assert.equal(this.get('number'), 1);

    this.$('input').val('4').change().focusout();
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '2');
    assert.equal(this.get('number'), 3);
  });
});

test('can deal with null values', function(assert) {
  assert.expect(1);

  this.render(hbs`{{formatted-input}}`);

  return wait().then(() => {
    assert.equal(this.$('input').val(), '');
  });
});

test('has the right class names', function(assert) {
  assert.expect(2);

  this.render(hbs`{{formatted-input format='xyz'}}`);

  return wait().then(() => {
    assert.ok(this.$('input').hasClass('formatted-input'));
    assert.ok(this.$('input').hasClass('formatted-input--xyz'));
  });
});
