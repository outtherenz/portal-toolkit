import { moduleForComponent, test } from 'ember-qunit';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-auto-complete', 'Integration | Component | input auto complete', {
  integration: true
});

test('brings up suggestions on input', function(assert) {
  assert.expect(1);

  const done = assert.async();

  this.set('availableTags', ['Ember', 'React']);

  this.render(hbs`{{input-auto-complete availableTags=availableTags}}`);

  this.$('#input-auto-complete__wrapper input').val('em').trigger('keyup');

  run.later(() => {
    assert.equal(this.$('.input-auto-complete__drop-down li').text(), 'Ember');
    done();
  }, 50);
});

test('selecting a suggestion sets value of input', function(assert) {
  assert.expect(1);

  const done = assert.async();

  this.set('availableTags', ['Ember', 'React']);
  this.set('value', '');

  this.render(hbs`{{input-auto-complete availableTags=availableTags value=value}}`);

  this.$('#input-auto-complete__wrapper input').val('em').trigger('keyup');

  run.later(() => {
    this.$('.input-auto-complete__drop-down li').click();
  }, 50);

  run.later(() => {
    assert.equal(this.$('#input-auto-complete__wrapper input').val(), 'Ember');
    done();
  }, 500);
});
