import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('value-change-indicator', 'Integration: ValueChangeIndicatorComponent', { integration: true }, function() {
  it('shows uses the correct classes and arrows', function() {
    this.set('diff', 10);

    this.render(hbs`{{value-change-indicator difference=diff}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.equal(true, 'good class on increase');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.equal(true, 'up arrow on increase');

    this.set('diff', -10);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.equal(true, 'bad class on decrease');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.equal(true, 'down arrow on decrease');

    this.set('diff', 0);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.equal(true, 'no-change class on no change');
    expect(this.$('.value-change-indicator .fa').text()).to.equal('', 'no icon on no change');
  });

  it('does not add good, bad, and no-change classes if useColor is false', function() {
    this.set('diff', 10);

    this.render(hbs`{{value-change-indicator difference=diff useColor=false}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.equal(false, 'no good class on increase');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.equal(true, 'up arrow on increase');

    this.set('diff', -10);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.equal(false, 'no bad class on decrease');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.equal(true, 'down arrow on decrease');

    this.set('diff', 0);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.equal(false, 'no no-change class on no change');
    expect(this.$('.value-change-indicator .fa').text()).to.equal('', 'no icon on no change');
  });

  it('inverts behaviour when increaseIsGood is false', function() {
    this.set('diff', -10);

    this.render(hbs`{{value-change-indicator difference=diff increaseIsGood=false}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.equal(true, 'good class on increase');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.equal(true, 'down arrow on increase');

    this.set('diff', 10);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.equal(true, 'bad class on decrease');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.equal(true, 'up arrow on decrease');

    this.set('diff', 0);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.equal(true, 'no-change class on no change');
    expect(this.$('.value-change-indicator .fa').text()).to.equal('', 'no icon on no change');
  });

  it('can calculate a difference between two values', function() {
    this.set('from', 50);
    this.set('to', 100);

    this.render(hbs`{{value-change-indicator from=from to=to}}`);

    expect(this.$('.value-change-indicator').hasClass('good')).to.equal(true, 'good class on increase');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up')).to.equal(true, 'up arrow on increase');

    this.set('from', 100);
    this.set('to', 50);

    expect(this.$('.value-change-indicator').hasClass('bad')).to.equal(true, 'bad class on decrease');
    expect(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down')).to.equal(true, 'down arrow on decrease');

    this.set('to', 100);

    expect(this.$('.value-change-indicator').hasClass('no-change')).to.equal(true, 'no-change class on no change');
    expect(this.$('.value-change-indicator .fa').text()).to.equal('', 'no icon on no change');
  });
});
