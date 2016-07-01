import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('radio-slider', 'Integration: RadioSliderComponent', { integration: true }, function() {
  it('renders', function() {
    var radioContent = [
     { label: 'Month', value: 'month' },
     { label: 'YTD', value: 'ytd' }
    ];
    var periodType = 'month';
    this.set('radioContent', radioContent);

    this.set('periodType', periodType);

    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    expect(this.$('.radio-wrapper')).to.have.lengthOf(1);
  });
  it('clicking stuff works', function() {
    var radioContent = [
     { label: 'Minutes', value: 'min' },
     { label: 'Hours', value: 'hour' },
     { label: 'Days', value: 'day' },
     { label: 'Weeks', value: 'week' },
     { label: 'Month', value: 'month' },
     { label: 'YTD', value: 'ytd' }
    ];
    var periodType = 'month';
    this.set('radioContent', radioContent);

    this.set('periodType', periodType);

    this.render(hbs` {{radio-slider options=radioContent selected=periodType}}`);
    this.$('#ytd').click();
    this.$('#min').click();
    this.$('#day').click();
    expect(this.get('periodType')).to.equal('day');

    this.$('#hour').click();
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
    expect(this.get('periodType')).to.equal('day');
  });
  it('two sliders work on one page', function() {
    var radioContent = [
     { label: 'Minutes', value: 'min' },
     { label: 'Hours', value: 'hour' },
     { label: 'Days', value: 'day' },
     { label: 'Weeks', value: 'week' },
     { label: 'Month', value: 'month' },
     { label: 'YTD', value: 'ytd' }
    ];
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
    this.set('radioContent', radioContent);
    this.set('periodType', periodType);
    this.set('secondaryContent', secondaryContent);
    this.set('secondaryType', secondaryType);

    this.render(hbs`
       {{radio-slider options=radioContent selected=periodType}}
       {{radio-slider options=secondaryContent selected=secondaryType}}
    `);
    expect(this.get('periodType')).to.equal('day');
    expect(this.get('secondaryType')).to.equal('dayTest');
    this.$('#min').click();
    expect(this.get('periodType')).to.equal('min');
    expect(this.get('secondaryType')).to.equal('dayTest');
    this.$('#monthTest').click();
    expect(this.get('periodType')).to.equal('min');
    expect(this.get('secondaryType')).to.equal('monthTest');
  });
});
