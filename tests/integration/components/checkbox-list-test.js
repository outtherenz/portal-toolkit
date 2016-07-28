import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  $,
  Object: EmberObject
} = Ember;

describeComponent('checkbox-list', 'Integration: CheckboxListComponent', { integration: true }, function() {
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

  it('renders the list items', function() {
    this.set('options', cars);

    this.render(hbs`{{checkbox-list options=options labelProperty='make'}}`);

    const labels = this.$('label');

    expect(this.$(labels[0]).text().trim()).to.equal('BMW');
    expect(this.$(labels[1]).text().trim()).to.equal('Ferari');
    expect(this.$(labels[2]).text().trim()).to.equal('Volvo');
  });

  it('has the selected item checked on init', function() {
    this.set('options', cars);
    this.set('selection', cars.slice(0, 2));

    this.render(hbs`{{checkbox-list options=options labelProperty='make' selection=selection}}`);

    const labels = this.$('label');
    const checkboxes = this.$('input');

    expect(labels.eq(0).text().trim()).to.equal('BMW');
    expect(labels.eq(1).text().trim()).to.equal('Ferari');
    expect(labels.eq(2).text().trim()).to.equal('Volvo');

    expect(checkboxes.eq(0).prop('checked')).to.equal(true);
    expect(checkboxes.eq(1).prop('checked')).to.equal(true);
    expect(checkboxes.eq(2).prop('checked')).to.equal(false);
  });

  it('adds the value a checkbox represents to the selection when that checkbox is checked', function() {
    this.set('options', persons);
    this.set('selection', persons.slice(0, 1));

    this.render(hbs`{{checkbox-list options=options labelProperty='name' selection=selection}}`);

    const checkboxes = this.$('input[type="checkbox"]');

    expect(checkboxes.eq(2).prop('checked')).to.equal(false);

    checkboxes.eq(2).click();

    expect(checkboxes.eq(2).prop('checked')).to.equal(true);
    expect(this.get('selection.length')).to.equal(2);
    expect(this.get('selection')[0]).to.exist;
    expect(this.get('selection')[1]).to.exist;
  });

  it('removes the value a checkbox represents from the selection when that checkbox is unchecked', function() {
    this.set('options', persons);
    this.set('selection', persons.slice(0, 1));

    this.render(hbs`{{checkbox-list options=options labelProperty='name' selection=selection}}`);

    const checkboxes = this.$('input[type="checkbox"]');

    expect(checkboxes.eq(0).prop('checked')).to.equal(true);

    checkboxes.eq(0).click();

    expect(checkboxes.eq(0).prop('checked')).to.equal(false);
    expect(this.get('selection.length')).to.equal(0);
  });
});
