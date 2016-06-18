import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('loading-button', 'Integration: LoadingButtonComponent', { integration: true }, function() {
  it('renders in inline form', function() {
    this.render(hbs`{{loading-button buttonText='Test'}}`);
    expect(this.$('button').text()).to.equal('Test');
  });

  it('renders in block form', function() {
    this.render(hbs`{{#loading-button}}Test{{/loading-button}}`);
    expect(this.$('button').text()).to.equal('Test');
  });

  it('shows a loading icon when loading', function() {
    this.render(hbs`{{loading-button isLoading=isLoading}}`);

    // Record the inital style attributes for comparison later
    const styleBefore = getComputedStyle(this.$('button')[0]);

    // Start loading
    this.set('isLoading', true);

    // Check the button is disabled and the icon is shown
    expect(this.$('button')[0].disabled).to.be.true;
    expect(this.$('button i.fa')).to.have.lengthOf(1);

    // Check the dimensions of the button didn't change
    const styleAfter = getComputedStyle(this.$('button')[0]);
    expect(styleBefore.width).to.equal(styleAfter.width);
    expect(styleBefore.height).to.equal(styleAfter.height);

    // Check everything returns to normal once loading finishes
    this.set('isLoading', false);
    expect(this.$('button').text()).to.equal('Submit');
  });

  it('triggers action when clicked', function(done) {
    this.set('test', done);
    this.render(hbs`{{loading-button action=(action test)}}`);
    this.$('button').click();
  });
});
