import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import {beforeEach} from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('sortable-list', 'Integration: SortableListComponent', { integration: true }, function() {
  beforeEach(function() {
    var content = [
      { name: 'john', value: '1' },
      { name: 'ben', value: '2' },
      { name: 'greg', value: '3' },
      { name: 'fraser', value: '4' },
      { name: 'janyk', value: '5' },
      { name: 'steve', value: '6' }
    ];
    this.set('content', content);
  });
  it('renders all our content correctly', function() {
    this.render(hbs`{{sortable-list content=content property='name' class="testClass"}}`);
    expect(this.$('.testClass li')).to.have.lengthOf(6);
    expect(this.$('ol.testClass li:nth-child(1)').text()).to.equal('john');
    expect(this.$('ol.testClass li:nth-child(2)').text()).to.equal('ben');
    expect(this.$('ol.testClass li:nth-child(3)').text()).to.equal('greg');
    expect(this.$('ol.testClass li:nth-child(4)').text()).to.equal('fraser');
    expect(this.$('ol.testClass li:nth-child(5)').text()).to.equal('janyk');
    expect(this.$('ol.testClass li:nth-child(6)').text()).to.equal('steve');
  });
  it('works when not supplied with a class', function() {
    this.render(hbs`{{sortable-list content=content property='name'}}`);
    expect(this.$(' li')).to.have.lengthOf(6);
    expect(this.$('ol li:nth-child(1)').text()).to.equal('john');
    expect(this.$('ol li:nth-child(2)').text()).to.equal('ben');
    expect(this.$('ol li:nth-child(3)').text()).to.equal('greg');
    expect(this.$('ol li:nth-child(4)').text()).to.equal('fraser');
    expect(this.$('ol li:nth-child(5)').text()).to.equal('janyk');
    expect(this.$('ol li:nth-child(6)').text()).to.equal('steve');
  });
  it('works as expected when not supplied with a name value', function() {
    this.render(hbs`{{sortable-list content=content class="testClass"}}`);
    expect(this.$('.testClass li')).to.have.lengthOf(6);
    expect(this.$('ol.testClass li:nth-child(1)').text()).to.equal('');
    expect(this.$('ol.testClass li:nth-child(2)').text()).to.equal('');
    expect(this.$('ol.testClass li:nth-child(3)').text()).to.equal('');
    expect(this.$('ol.testClass li:nth-child(4)').text()).to.equal('');
    expect(this.$('ol.testClass li:nth-child(5)').text()).to.equal('');
    expect(this.$('ol.testClass li:nth-child(6)').text()).to.equal('');
  });
  it('works as expected when not supplied with content', function() {
    this.render(hbs`{{sortable-list property='name' class="testClass"}}`);
    expect(this.$('.testClass li')).to.have.lengthOf(0);
  });
});
