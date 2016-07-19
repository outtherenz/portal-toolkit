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
  it('renders', function() {
    this.render(hbs`{{sortable-list content=content property='name' class="block"}}`);
    expect(this.$('.block li')).to.have.lengthOf(6);
    expect(this.$('.block li:nth-child(1)')).to.equal('john');
  });
  it.only('click and drag part 1', function() {
    this.render(hbs`{{sortable-list content=content property='name' class="block"}}`);
    const $location = this.$('.block li:nth-child(1)');
    $location.mousedown();
    expect($location.text()).to.equal('john');
    console.log($location);
  });
});
