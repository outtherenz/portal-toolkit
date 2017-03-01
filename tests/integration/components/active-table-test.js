import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('active-table', 'Integration | Component | active table', {
  integration: true
});

const SORTED_CLASS = 'data-table__sorted-column-header';

test('sorts columns when their headers are clicked', function(assert) {
  assert.expect(4);

  this.set('tableColumns', [
    { name: 'A', key: 'a' },
    { name: 'B', key: 'b' },
    { name: 'C', key: 'c' }
  ]);

  this.set('sort', [ 'a:asc' ]);

  this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

  assert.equal(this.$(`.${SORTED_CLASS}`).length, 1, 'only one heading should have the sorted class');
  assert.equal(this.$(`th:not(.${SORTED_CLASS})`).length, 2, 'two headings should not have the sorted class');

  const col1 = this.$('th:eq(0)');
  const col2 = this.$('th:eq(1)');

  col2.find('a').click();

  return wait().then(() => {
    assert.equal(col1.hasClass(SORTED_CLASS), false, 'previously sorted column no longer has sorted class');
    assert.equal(col2.hasClass(SORTED_CLASS), true, 'clicked header gets sorted class');
  });
});
