import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('radio-slider', 'Integration | Component | radio slider', {
  integration: true,

  beforeEach() {
    const radioContent = [
      { label: 'Minutes', value: 'min' },
      { label: 'Hours', value: 'hour' },
      { label: 'Days', value: 'day' },
      { label: 'Weeks', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'YTD', value: 'ytd' }
    ];

    this.set('radioContent', radioContent);
  }
});

test('it renders the correct number of options', function(assert) {
  assert.expect(1);

  this.set('periodType', 'month');
  this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);

  assert.equal(this.$('label').length, 6);
});

test('it changes the selected option when one if clicked', function(assert) {
  assert.expect(2);

  this.set('periodType', 'month');
  this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);

  this.$("input[value='day']").next().click();

  assert.equal(this.get('periodType'), 'day', 'clicking day selects day');

  this.$("input[value='ytd']").next().click();
  this.$("input[value='min']").next().click();
  this.$("input[value='hour']").next().click();

  assert.equal(this.get('periodType'), 'hour', 'clickling lots of options selects the last clicked option');
});

test('it loads the initial value correctly', function(assert) {
  assert.expect(3);

  const radioContent = [
   { label: 'Minutes', value: 'min' },
   { label: 'Hours', value: 'hour' },
   { label: 'Days', value: 'day' },
   { label: 'Weeks', value: 'week' },
   { label: 'Month', value: 'month' },
   { label: 'YTD', value: 'ytd' }
  ];

  this.set('radioContent', radioContent);
  this.set('periodType', 'day');

  this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);

  assert.ok(this.$("input[value='day']").is(':checked'));
  assert.notOk(this.$("input[value='month']").is(':checked'));
  assert.equal(this.get('periodType'), 'day', 'period type is not changed on load');
});

test('it two sliders work on one page', function(assert) {
  assert.expect(6);

  const radioContent2 = [
   { label: 'Minutes 2', value: 'min2' },
   { label: 'Hours 2', value: 'hour2' },
   { label: 'Days 2', value: 'day2' },
   { label: 'Weeks 2', value: 'week2' },
   { label: 'Month 2', value: 'month2' },
   { label: 'YTD 2', value: 'ytd2' }
  ];

  this.set('periodType1', 'day');
  this.set('periodType2', 'day2');

  this.set('radioContent2', radioContent2);

  this.render(hbs`
     {{radio-slider options=radioContent selected=periodType1}}
     {{radio-slider options=radioContent2 selected=periodType2}}
  `);

  assert.equal(this.get('periodType1'), 'day');
  assert.equal(this.get('periodType2'), 'day2');

  this.$("input[value='min']").next().click();

  assert.equal(this.get('periodType1'), 'min');
  assert.equal(this.get('periodType2'), 'day2');

  this.$("input[value='month2']").next().click();

  assert.equal(this.get('periodType1'), 'min');
  assert.equal(this.get('periodType2'), 'month2');
});
