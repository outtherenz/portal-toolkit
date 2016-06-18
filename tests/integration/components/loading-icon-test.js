import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('loading-icon', 'Integration: LoadingIconComponent', { integration: true }, function() {
  it('renders a ripple', function() {
    this.render(hbs`{{loading-icon 'ripple'}}`);

    const icon = this.$().children('.loading-icon.ripple');
    expect(icon).to.have.lengthOf(1);

    const svg = icon.children('svg');
    expect(svg).to.have.lengthOf(1);

    const circles = svg.children('circle');
    expect(circles).to.have.lengthOf(4);
  });

  it('renders a spinner', function() {
    this.render(hbs`{{loading-icon 'spinner'}}`);

    const icon = this.$().children('.loading-icon.spinner');
    expect(icon).to.have.lengthOf(1);

    const svg = icon.children('svg');
    expect(svg).to.have.lengthOf(1);

    const circles = svg.children('circle');
    expect(circles).to.have.lengthOf(1);
  });
});
