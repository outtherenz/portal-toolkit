import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('formatted-input', 'Integration | Component | formatted input', {
  integration: true
});

test('formats the initial value', function(assert) {
  assert.expect(1);

  this.render(hbs`{{formatted-input number=5000.666 isManual=false format='number'}}`);

  return wait().then(() => {
    assert.equal(this.$('input').val(), '5,000.67');
  });
});

test('responds to source change', function(assert) {
  assert.expect(2);

  this.set('number', 1.5);

  this.set('manualChange', value => {
    throw new Error('The manual change action should not have been called');
  });

  this.render(hbs`{{formatted-input format='currency' number=number manualChange=(action manualChange)}}`);

  wait().then(() => {
    assert.equal(this.$('input').val(), '1.50');
    this.set('number', 5.2);
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '5.20');
  });
});

test('does not respond to source change if manual', function(assert) {
  assert.expect(2);

  this.set('number', 1.5);
  this.render(hbs`{{formatted-input number=number isManual=true}}`);

  wait().then(() => {
    assert.equal(this.$('input').val(), '1.50');
    this.set('number', 5.2);
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '1.50');
  });
});

test('responds to user editing the field', function(assert) {
  assert.expect(1);

  this.set('number', 1.5);

  this.set('manualChange', value => {
    assert.equal(value, 21.5);
  });

  this.render(hbs`{{formatted-input number=number manualChange=(action manualChange)}}`);

  return wait().then(() => {
    this.$('input').val('21.50').trigger('change');
  });
});

test('reformats on blur', function(assert) {
  assert.expect(1);

  this.set('number', 1.5);
  this.set('manualChange', value => this.set('number', value));
  this.render(hbs`{{formatted-input number=number isManual=false manualChange=(action manualChange)}}`);

  wait().then(() => {
    this.$('input').val('1000').trigger('change').trigger('focusOut');
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '1,000.00');
  });
});

test('obeys the selectOnFocus option', function(assert) {
  assert.expect(1);

  this.render(hbs`{{formatted-input number=125 selectOnFocus=true}}`);

  wait().then(() => {
    this.$('input').trigger('focusin').trigger('click');
  });

  return wait().then(() => {
    const selection = getSelection().toString();
    const inputValue = this.$('input').val();
    assert.equal(selection, inputValue);
  });
});

test('handles other formats', function(assert) {
  assert.expect(3);

  this.set('format', 'number');
  this.render(hbs`{{formatted-input number=1299.5 format=format}}`);

  wait().then(() => {
    assert.equal(this.$('input').val(), '1,299.50');
    this.set('format', 'percentage');
  });

  wait().then(() => {
    assert.equal(this.$('input').val(), '129,950.00%');
    this.set('format', 'integer');
  });

  return wait().then(() => {
    assert.equal(this.$('input').val(), '1,300');
  });
});

test('properly converts percentages between percentage and decimal forms', function(assert) {
  assert.expect(3);

  this.set('number', 0.5);
  this.set('manualChange', function(value) {
    this.set('number', value);
  });

  this.render(hbs`
    {{formatted-input
      number=number
      format='percentage'
      manualChange=(action manualChange)
      isManual=true}}
  `);

  const $input = this.$('input');

  wait().then(() => {
    assert.equal($input.val(), '50.00%');
    $input.val('60').trigger('change');
  });

  wait().then(() => {
    assert.equal($input.val(), '60'); // shouldn't reformat while user is typing
    $input.trigger('focusout');
  });

  return wait().then(() => {
    assert.equal($input.val(), '60.00%');
  });
});

test('can deal with null values', function(assert) {
  assert.expect(1);

  this.render(hbs`{{formatted-input}}`);

  return wait().then(() => {
    assert.equal(this.$('input').val(), '');
  });
});
