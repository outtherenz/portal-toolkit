import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const {
  $
} = Ember;

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
    this.render(hbs`{{sortable-list content=content property='name'}}`);
    expect(this.$(' li')).to.have.lengthOf(6);
    expect(this.$('ol li:nth-child(1)').text()).to.equal('john');
    expect(this.$('ol li:nth-child(2)').text()).to.equal('ben');
    expect(this.$('ol li:nth-child(3)').text()).to.equal('greg');
    expect(this.$('ol li:nth-child(4)').text()).to.equal('fraser');
    expect(this.$('ol li:nth-child(5)').text()).to.equal('janyk');
    expect(this.$('ol li:nth-child(6)').text()).to.equal('steve');
  });

  it('uses the `value` key if no property name is provided', function() {
    this.render(hbs`{{sortable-list content=content}}`);
    expect(this.$('ol li')).to.have.lengthOf(6);
    expect(this.$('ol li:nth-child(1)').text()).to.equal('1');
    expect(this.$('ol li:nth-child(2)').text()).to.equal('2');
    expect(this.$('ol li:nth-child(3)').text()).to.equal('3');
    expect(this.$('ol li:nth-child(4)').text()).to.equal('4');
    expect(this.$('ol li:nth-child(5)').text()).to.equal('5');
    expect(this.$('ol li:nth-child(6)').text()).to.equal('6');
  });

  it('renders an empty list if not provided with any content', function() {
    this.render(hbs`{{sortable-list property='name'}}`);
    expect(this.$('ol')).to.have.lengthOf(1);
    expect(this.$('ol li')).to.have.lengthOf(0);
  });

  it.skip('reorders content when items are dragged and dropped');
});
