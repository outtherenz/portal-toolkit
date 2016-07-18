import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import {beforeEach} from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('radio-slider', 'Integration: RadioSliderComponent', { integration: true }, function() {
  beforeEach(function() {
    var radioContent = [
      { label: 'Minutes', value: 'min' },
      { label: 'Hours', value: 'hour' },
      { label: 'Days', value: 'day' },
      { label: 'Weeks', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'YTD', value: 'ytd' }
    ];
    this.set('radioContent', radioContent);
  });
  it('renders', function() {
    var periodType = 'month';
    this.set('periodType', periodType);

    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    expect(this.$('.radio-wrapper .radio-box .ember-view')).to.have.lengthOf(6);
  });
  it('clicking stuff works', function() {
    var periodType = 'month';
    this.set('periodType', periodType);

    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    this.$("input[value='ytd']").next().click();
    this.$("input[value='min']").next().click();
    this.$("input[value='day']").next().click();
    expect(this.get('periodType')).to.equal('day');

    this.$("input[value='hour']").next().click();
    expect(this.get('periodType')).to.equal('hour');
  });
  it('initial value is initial value', function() {
    var radioContent = [
     { label: 'Minutes', value: 'min' },
     { label: 'Hours', value: 'hour' },
     { label: 'Days', value: 'day' },
     { label: 'Weeks', value: 'week' },
     { label: 'Month', value: 'month' },
     { label: 'YTD', value: 'ytd' }
    ];
    var periodType = 'day';
    this.set('radioContent', radioContent);

    this.set('periodType', periodType);

    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    expect(this.$("input[value='day']")).to.be.checked;
    expect(this.$("input[value='month']")).to.not.be.checked;
    expect(this.get('periodType')).to.equal('day');
  });
  it('two sliders work on one page', function() {
    var secondaryContent = [
     { label: 'MinutesTest', value: 'minTest' },
     { label: 'HoursTest', value: 'hourTest' },
     { label: 'DaysTest', value: 'dayTest' },
     { label: 'WeeksTest', value: 'weekTest' },
     { label: 'MonthTest', value: 'monthTest' },
     { label: 'YTDTest', value: 'ytdTest' }
    ];
    var periodType = 'day';
    var secondaryType = 'dayTest';
    this.set('periodType', periodType);
    this.set('secondaryContent', secondaryContent);
    this.set('secondaryType', secondaryType);

    this.render(hbs`
       {{radio-slider options=radioContent selected=periodType}}
       {{radio-slider options=secondaryContent selected=secondaryType}}
    `);
    expect(this.get('periodType')).to.equal('day');
    expect(this.get('secondaryType')).to.equal('dayTest');
    this.$("input[value='min']").next().click();
    expect(this.get('periodType')).to.equal('min');
    expect(this.get('secondaryType')).to.equal('dayTest');
    this.$("input[value='monthTest']").next().click();
    expect(this.get('periodType')).to.equal('min');
    expect(this.get('secondaryType')).to.equal('monthTest');
  });
});
