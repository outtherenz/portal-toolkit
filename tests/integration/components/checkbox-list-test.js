import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { $ } = Ember;

describeComponent('checkbox-list', 'Integration: CheckboxListComponent', { integration: true }, function() {
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    this.render(hbs`
      {{#checkbox-list}}
        template content
      {{/checkbox-list}}
    `);

    this.render(hbs`{{checkbox-list}}`);
    expect(this.$()).to.have.lengthOf(1);
  });
  const fruits = ['apple', 'orange', 'strawberry'];

  const cars = [
    {make: 'BMW', color: 'black'},
    {make: 'Ferari', color: 'red'},
    {make: 'Volvo', color: 'blue'}
  ];

  const Person = Ember.Object.extend({
    name: null,

    gender: null
  });

  const persons = [
    Person.create({ name: 'Lisa', gender: 'Female' }),
    Person.create({ name: 'Bob', gender: 'Male' }),
    Person.create({ name: 'John', gender: 'Male' })
  ];

  it('uses the correct labels with primitive values and no label property', function() {
    this.set('options', fruits);

    this.render(hbs`
      {{checkbox-list options=options}}
    `);

    const labels = this.$('label');

    expect(this.$(labels[0]).text().trim()).to.equal('apple');
    expect(this.$(labels[1]).text().trim()).to.equal('orange');
    expect(this.$(labels[2]).text().trim()).to.equal('strawberry');
  });
  it('uses the correct labels with plain js values and a label property', function() {
    this.set('options', cars);

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='make'}}
    `);

    const labels = this.$('label');
    expect(this.$(labels[0]).text().trim()).to.equal('BMW');
    expect(this.$(labels[1]).text().trim()).to.equal('Ferari');
    expect(this.$(labels[2]).text().trim()).to.equal('Volvo');
  });

  it('labels are not translated when translate is true and i18n addon is not present', function() {
    this.set('options', persons);

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' translate=true i18n=null}}
    `);

    const labels = this.$('label');

    expect(this.$(labels[0]).text().trim()).to.equal('Lisa');
    expect(this.$(labels[1]).text().trim()).to.equal('Bob');
    expect(this.$(labels[2]).text().trim()).to.equal('John');
  });

  it('uses the correct labels with Ember object values and a label property', function() {
    this.set('options', persons);

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name'}}
    `);

    const labels = this.$('label');

    expect(this.$(labels[0]).text().trim()).to.equal('Lisa');
    expect(this.$(labels[1]).text().trim()).to.equal('Bob');
    expect(this.$(labels[2]).text().trim()).to.equal('John');
  });

  it('checks the checkboxes that represent a value currently in the selection', function() {
    this.setProperties({
      options: persons,
      selection: [persons[0], persons[2]]
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');
    expect(this.$(checkboxes[0]).prop('checked')).to.equal(true);
    expect(this.$(checkboxes[1]).prop('checked')).to.equal(false);
    expect(this.$(checkboxes[2]).prop('checked')).to.equal(true);
  });

  it('adds the value a checkbox represents to the selection when that checkbox is checked', function() {
    this.setProperties({
      options: persons,
      selection: [persons[0]]
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');
    expect(this.$(checkboxes[2]).prop('checked')).to.equal(false);

    $(checkboxes[2]).click();

    expect(this.$(checkboxes[2]).prop('checked')).to.equal(true);
    expect(this.get('selection.length')).to.equal(2);
    expect(this.get('selection')[0]).to.exist;
    expect(this.get('selection')[1]).to.exist;

  });

  it('removes the value a checkbox represents from the selection when that checkbox is unchecked', function() {
    this.setProperties({
      options: persons,
      selection: [persons[0]]
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(true);

    $(checkboxes[0]).click();

    expect($(checkboxes[0]).prop('checked')).equal(false);
    expect(this.get('selection.length')).to.equal(0);
    expect(this.get('selection')[0]).to.not.equal(persons[0]);
  });

  it('triggers the onchange action with the new selection when the selection changes', function() {
    this.setProperties({
      options: persons,
      selection: [],
      'actions.updateSelection': newSelection => {
        expect(newSelection.length).to.equal(1);
        expect(newSelection[0]).to.exist;

      }
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection onchange=(action 'updateSelection')}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    $(checkboxes[1]).click();
  });

  it('does not update the bound selection value when updateSelectionValue is set to false', function() {
    this.setProperties({
      options: persons,
      selection: [persons[0]]
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection updateSelectionValue=false}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    $(checkboxes[1]).click();

    expect(this.get('selection.length')).to.equal(1);

    expect(this.get('selection')[0]).to.contain(persons[0]);

    expect(this.get('selection')[0]).to.exist;
    expect(this.get('selection')[1]).to.not.exist;

  });

  it('checks the correct options with plain js values and a value property', function() {
    this.setProperties({
      options: cars,
      selection: ['red']
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' valueProperty='color' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(false);
    expect($(checkboxes[1]).prop('checked')).equal(true);
    expect($(checkboxes[2]).prop('checked')).equal(false);

  });

  it('updates the selection correctly with plain js values and a value property', function() {
    this.setProperties({
      options: cars,
      selection: ['red']
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' valueProperty='color' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(false);

    $(checkboxes[0]).click();

    expect($(checkboxes[0]).prop('checked')).equal(true);

    expect(this.get('selection.length')).to.equal(2);
    expect(this.get('selection')).to.contain('black');
    expect(this.get('selection')).to.contain('red');
  });

  it('checks the correct options with Ember object values and a value property', function() {
    this.setProperties({
      options: persons,
      selection: ['Bob']
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' valueProperty='name' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(false);
    expect($(checkboxes[1]).prop('checked')).equal(true);
    expect($(checkboxes[2]).prop('checked')).equal(false);
  });

  it('updates the selection correctly with Ember object values and a value property', function() {
    this.setProperties({
      options: persons,
      selection: ['Bob']
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' valueProperty='name' selection=selection}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(false);

    $(checkboxes[0]).click();

    expect($(checkboxes[0]).prop('checked')).equal(true);
    expect(this.get('selection.length')).to.equal(2);
    expect(this.get('selection')).to.contain('Lisa');
    expect(this.get('selection')).to.contain('Bob');

  });

  it('disables all checkboxes when disabled is set to true', function() {
    this.setProperties({
      options: persons,
      selection: [persons[0]]
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection disabled=true}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    checkboxes.each((index, checkbox) => {
      // assert.equal($(checkbox).prop('disabled'), true);
      expect($(checkboxes[0]).prop('disabled')).equal(true);

    });

    checkboxes.each((index, checkbox) => {
      $(checkbox).click();
    });

    // assert.equal(this.get('selection.length'), 1);
    expect(this.get('selection.length')).to.equal(1);

    // assert.equal(this.get('selection').contains(persons[0]), true);
    expect(this.get('selection')).to.contain(persons[0]);
  });

  it('updates the displayed options when the bound options change', function() {
    this.set('options', fruits);

    this.render(hbs`
      {{multiselect-checkboxes options=options}}
    `);

    let labels = this.$('label');
    expect(this.$(labels[0]).text().trim()).to.equal('apple');
    expect(this.$(labels[1]).text().trim()).to.equal('orange');
    expect(this.$(labels[2]).text().trim()).to.equal('strawberry');

    Ember.run(() => fruits.reverseObjects());

    labels = this.$('label');
    expect(this.$(labels[0]).text().trim()).to.equal('strawberry');
    expect(this.$(labels[1]).text().trim()).to.equal('orange');
    expect(this.$(labels[2]).text().trim()).to.equal('apple');
  });

  it('updates checkboxes when the bound selection changes', function() {
    const selection = [persons[0], persons[2]];

    this.setProperties({
      options: persons,
      selection: selection
    });

    this.render(hbs`
      {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
    `);

    let checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(true);
    expect($(checkboxes[1]).prop('checked')).equal(false);
    expect($(checkboxes[2]).prop('checked')).equal(true);

    Ember.run(() => selection.removeObject(persons[0]));

    checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[0]).prop('checked')).equal(false);
    expect($(checkboxes[1]).prop('checked')).equal(false);
    expect($(checkboxes[2]).prop('checked')).equal(true);
  });

  it('with a template block displays the correct custom labels for each person', function() {
    this.set('options', persons);

    this.render(hbs`
      {{#multiselect-checkboxes options=options as |person isSelected|}}
        <li>
          <label>
            {{input type="checkbox" checked=isSelected}}
            --{{person.name}}--
          </label>
        </li>
      {{/multiselect-checkboxes}}
    `);

    const labels = this.$('label');
    expect(this.$(labels[0]).text().trim()).to.equal('--Lisa--');
    expect(this.$(labels[1]).text().trim()).to.equal('--Bob--');
    expect(this.$(labels[2]).text().trim()).to.equal('--John--');
  });

  it('with a template block adds the value a checkbox represents to the selection when that checkbox is checked', function() {
    this.setProperties({
      options: persons,
      selection: []
    });

    this.render(hbs`
      {{#multiselect-checkboxes options=options selection=selection as |person isSelected|}}
        <li>
          <label>
            {{input type="checkbox" checked=isSelected}}
            --{{person.name}}--
          </label>
        </li>
      {{/multiselect-checkboxes}}
    `);

    const checkboxes = this.$('input[type="checkbox"]');

    expect($(checkboxes[2]).prop('checked')).equal(false);

    $(checkboxes[2]).click();

    expect($(checkboxes[2]).prop('checked')).equal(true);

    expect(this.get('selection.length')).to.equal(1);
    expect(this.get('selection')).to.contain(persons[2]);
  });
});
