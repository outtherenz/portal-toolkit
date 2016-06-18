import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('value-change-indicator', 'Integration: ValueChangeIndicatorComponent', { integration: true }, function() {
  it('works with a positive difference', function() {
    this.render(hbs`{{value-change-indicator difference=10}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.be.true;
  });

  it('works with a negative difference', function() {
    this.render(hbs`{{value-change-indicator difference=-10}}`);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.be.true;
  });

  it('works with no difference', function() {
    this.render(hbs`{{value-change-indicator difference=0}}`);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.be.true;
    expect(this.$('.value-change-indicator .fa').text()).to.be.empty;
  });

  it('obeys the useColor option', function() {
    this.render(hbs`{{value-change-indicator difference=5 useColor=false}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.be.false;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.be.true;
  });

  it('obeys the increaseIsGood option', function() {
    this.render(hbs`{{value-change-indicator difference=5 increaseIsGood=false}}`);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.be.true;

    this.render(hbs`{{value-change-indicator difference=-5 increaseIsGood=false}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.be.true;
  });

  it('can calculate a difference between two values', function() {
    this.render(hbs`{{value-change-indicator from=50 to=100}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.be.true;

    this.render(hbs`{{value-change-indicator from=100 to=50}}`);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.be.true;
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.be.true;

    this.render(hbs`{{value-change-indicator from=100 to=100}}`);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.be.true;
    expect(this.$('.value-change-indicator .fa').text()).to.be.empty;
  });
});
