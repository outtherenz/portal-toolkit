import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | checkbox list', function(hooks) {
  setupRenderingTest(hooks);

  const cars = [
    { make: 'BMW', color: 'black' },
    { make: 'Ferari', color: 'red' },
    { make: 'Volvo', color: 'blue' }
  ];

  const Person = EmberObject.extend({
    name: null,
    gender: null
  });

  const persons = [
    Person.create({ name: 'Lisa', gender: 'Female' }),
    Person.create({ name: 'Bob', gender: 'Male' }),
    Person.create({ name: 'John', gender: 'Male' })
  ];

  test('it renders the list items', async function(assert) {
    assert.expect(3);

    this.set('options', cars);

    await render(hbs`{{checkbox-list options=options labelProperty='make'}}`);

    const labels = this.$('label');

    assert.equal(this.$(labels[0]).text().trim(), 'BMW');
    assert.equal(this.$(labels[1]).text().trim(), 'Ferari');
    assert.equal(this.$(labels[2]).text().trim(), 'Volvo');
  });

  test('it has the selected item checked on init', async function(assert) {
    assert.expect(6);

    this.set('options', cars);
    this.set('selection', cars.slice(0, 2));

    await render(hbs`{{checkbox-list options=options labelProperty='make' selection=selection}}`);

    const labels = this.$('label');
    const checkboxes = this.$('input');

    assert.equal(labels.eq(0).text().trim(), 'BMW');
    assert.equal(labels.eq(1).text().trim(), 'Ferari');
    assert.equal(labels.eq(2).text().trim(), 'Volvo');

    assert.equal(checkboxes.eq(0).prop('checked'), true);
    assert.equal(checkboxes.eq(1).prop('checked'), true);
    assert.equal(checkboxes.eq(2).prop('checked'), false);
  });

  test('it adds the value a checkbox represents to the selection when that checkbox is checked', async function(assert) {
    assert.expect(5);

    this.set('options', persons);
    this.set('selection', persons.slice(0, 1));

    await render(hbs`{{checkbox-list options=options labelProperty='name' selection=selection}}`);

    const checkboxes = this.$('input[type="checkbox"]');

    assert.equal(checkboxes.eq(2).prop('checked'), false);

    checkboxes.eq(2).click();

    assert.ok(checkboxes.eq(2).prop('checked'));
    assert.equal(this.get('selection.length'), 2);
    assert.ok(this.selection[0]);
    assert.ok(this.selection[1]);
  });

  test('it removes the value a checkbox represents from the selection when that checkbox is unchecked', async function(assert) {
    assert.expect(3);

    this.set('options', persons);
    this.set('selection', persons.slice(0, 1));

    await render(hbs`{{checkbox-list options=options labelProperty='name' selection=selection}}`);

    const checkboxes = this.$('input[type="checkbox"]');

    assert.ok(checkboxes.eq(0).prop('checked'));

    checkboxes.eq(0).click();

    assert.notOk(checkboxes.eq(0).prop('checked'));
    assert.equal(this.get('selection.length'), 0);
  });
});
