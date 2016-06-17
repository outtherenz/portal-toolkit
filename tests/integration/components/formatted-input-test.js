import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

describeComponent('formatted-input', 'Integration: FormattedInputComponent', { integration: true }, function() {
  it('formats the initial value', function() {
    this.render(hbs`{{formatted-input number=5000.666 isManual=false format='number'}}`);

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('5,000.67');
    });
  });

  it('responds to source change', function() {
    this.set('number', 1.5);

    this.set('manualChange', value => {
      expect(false).to.be.true;
      console.log(value);
    });
    this.render(hbs`{{formatted-input format='currency' number=number manualChange=(action manualChange)}}`);
    wait().then(() => {
      expect(this.$('input').val()).to.equal('1.50');
      this.set('number', 5.2);
    });

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('5.20');
    });
  });

  it('does not respond to source change if manual', function() {
    this.set('number', 1.5);
    this.render(hbs`{{formatted-input number=number isManual=true}}`);

    wait().then(() => {
      expect(this.$('input').val()).to.equal('1.50');
      this.set('number', 5.2);
    });

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('1.50');
    });
  });

  it('responds to user editing the field', function(done) {
    this.set('number', 1.5);

    this.set('manualChange', value => {
      expect(value).to.equal(21.5);
      done();
    });

    this.render(hbs`{{formatted-input number=number manualChange=(action manualChange)}}`);

    return wait().then(() => {
      this.$('input').val('21.50').trigger('change');
    });
  });

  it('reformats on blur', function() {
    this.set('number', 1.5);
    this.set('manualChange', value => this.set('number', value));
    this.render(hbs`{{formatted-input number=number isManual=false manualChange=(action manualChange)}}`);

    wait().then(() => {
      this.$('input').val('1000').trigger('change').trigger('focusOut');
    });

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('1,000.00');
    });
  });

  it('obeys the selectOnFocus option', function() {
    this.render(hbs`{{formatted-input number=125 selectOnFocus=true}}`);

    wait().then(() => {
      this.$('input').trigger('focusin').trigger('click');
    });

    return wait().then(() => {
      const selection = getSelection().toString();
      const inputValue = this.$('input').val();
      expect(selection).equals(inputValue);
    });
  });

  it('handles other formats', function() {
    this.set('format', 'number');
    this.render(hbs`{{formatted-input number=1299.5 format=format}}`);

    wait().then(() => {
      expect(this.$('input').val()).to.equal('1,299.50');
      this.set('format', 'percentage');
    });

    wait().then(() => {
      expect(this.$('input').val()).to.equal('129,950.00%');
      this.set('format', 'integer');
    });

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('1,300');
    });
  });

  it('properly converts percentages between percentage and decimal forms', function() {
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
      expect($input.val()).to.equal('50.00%');
      $input.val('60').trigger('change');
    });

    wait().then(() => {
      expect($input.val()).to.equal('60'); // shouldn't reformat while user is typing
      $input.trigger('focusout');
    });

    return wait().then(() => {
      expect($input.val()).to.equal('60.00%');
    });
  });

  it('can deal with null values', function() {
    this.render(hbs`{{formatted-input}}`);

    return wait().then(() => {
      expect(this.$('input').val()).to.equal('');
    });
  });
});
