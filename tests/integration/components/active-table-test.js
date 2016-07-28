import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

describeComponent('active-table', 'Integration: ActiveTableComponent', { integration: true }, function() {
  it('sorts columns when their headers are clicked', function() {
    this.set('tableColumns', [
      { name: 'A', key: 'a' },
      { name: 'B', key: 'b' },
      { name: 'C', key: 'c' }
    ]);

    this.set('sort', [ 'a:asc' ]);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    expect(this.$('.sorted')).to.have.lengthOf(1, 'only one heading should have the sorted class');
    expect(this.$('th:not(.sorted)')).to.have.lengthOf(2, 'two headings should not have the sorted class');

    const col1 = this.$('th:eq(0)');
    const col2 = this.$('th:eq(1)');

    col2.find('a').click();

    return wait().then(() => {
      expect(col1.hasClass('sorted')).to.equal(false, 'previously sorted column no longer has sorted class');
      expect(col2.hasClass('sorted')).to.equal(true, 'clicked header gets sorted class');
    });
  });

  it('clicking a sorted heading inverses the sort order', function() {
    this.set('tableColumns', [
      { name: 'A', key: 'a' },
      { name: 'B', key: 'b' },
      { name: 'C', key: 'c' }
    ]);

    this.set('sort', [ 'a:asc' ]);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    const col1 = this.$('th.sorted.ascending');

    col1.find('a').click();

    expect(col1.hasClass('ascending')).to.equal(false, 'ascending class is removed');
  });

  it('proportionally scales column widths', function() {
    this.set('tableColumns', [
      { name: 'A', key: 'a', width: 1 },
      { name: 'B', key: 'b', width: 2 },
      { name: 'C', key: 'c', width: 3 }
    ]);

    this.set('sort', [ 'a:asc' ]);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    expect(this.$('th:eq(0)').prop('width')).to.contain('16.6', 'width of column 1');
    expect(this.$('th:eq(1)').prop('width')).to.contain('33.3', 'width of column 2');
    expect(this.$('th:eq(2)').prop('width')).to.contain('50', 'width of column 3');
  });
});
