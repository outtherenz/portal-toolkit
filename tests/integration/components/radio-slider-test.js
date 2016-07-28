import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import {beforeEach} from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('radio-slider', 'Integration: RadioSliderComponent', { integration: true }, function() {
  beforeEach(function() {
    const radioContent = [
      { label: 'Minutes', value: 'min' },
      { label: 'Hours', value: 'hour' },
      { label: 'Days', value: 'day' },
      { label: 'Weeks', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'YTD', value: 'ytd' }
    ];
    this.set('radioContent', radioContent);
  });

  it('renders the correct number of options', function() {
    this.set('periodType', 'month');
    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    expect(this.$('.radio-wrapper .radio-box .ember-view')).to.have.lengthOf(6);
  });

  it('changes the selected option when one if clicked', function() {
    this.set('periodType', 'month');
    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);

    this.$("input[value='day']").next().click();

    expect(this.get('periodType')).to.equal('day', 'clicking day selects day');

    this.$("input[value='ytd']").next().click();
    this.$("input[value='min']").next().click();
    this.$("input[value='hour']").next().click();

    expect(this.get('periodType')).to.equal('hour', 'clickling lots of options selects the last clicked option');
  });

  it('loads the initial value correctly', function() {
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

    expect(this.$("input[value='day']")).to.be.checked;
    expect(this.$("input[value='month']")).to.not.be.checked;
    expect(this.get('periodType')).to.equal('day', 'period type is not changed on load');
  });

  it('two sliders work on one page', function() {
    const radioContent2 = [
     { label: 'Minutes 2', value: 'min2' },
     { label: 'Hours 2', value: 'hour2' },
     { label: 'Days 2', value: 'day2' },
     { label: 'Weeks 2', value: 'week2' },
     { label: 'Month 2', value: 'month2' },
     { label: 'YTD 2', value: 'ytd2' }
    ];

    const secondaryType = 'dayTest';
    this.set('periodType1', 'day');
    this.set('periodType2', 'day2');

    this.set('radioContent2', radioContent2);

    this.render(hbs`
       {{radio-slider options=radioContent selected=periodType1}}
       {{radio-slider options=radioContent2 selected=periodType2}}
    `);

    expect(this.get('periodType1')).to.equal('day');
    expect(this.get('periodType2')).to.equal('day2');

    this.$("input[value='min']").next().click();

    expect(this.get('periodType1')).to.equal('min');
    expect(this.get('periodType2')).to.equal('day2');

    this.$("input[value='month2']").next().click();

    expect(this.get('periodType1')).to.equal('min');
    expect(this.get('periodType2')).to.equal('month2');
  });
});
