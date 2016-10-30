import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sortable-list', 'Integration | Component | sortable list', {
  integration: true,

  beforeEach() {
    var content = [
      { name: 'john', value: '1' },
      { name: 'ben', value: '2' },
      { name: 'greg', value: '3' },
      { name: 'fraser', value: '4' },
      { name: 'janyk', value: '5' },
      { name: 'steve', value: '6' }
    ];

    this.set('content', content);
  }
});

test('it renders all our content correctly', function(assert) {
  assert.expect(7);

  this.render(hbs`{{sortable-list content=content property='name'}}`);
  assert.equal(this.$(' li').length, 6);
  assert.equal(this.$('ol li:nth-child(1)').text(), 'john');
  assert.equal(this.$('ol li:nth-child(2)').text(), 'ben');
  assert.equal(this.$('ol li:nth-child(3)').text(), 'greg');
  assert.equal(this.$('ol li:nth-child(4)').text(), 'fraser');
  assert.equal(this.$('ol li:nth-child(5)').text(), 'janyk');
  assert.equal(this.$('ol li:nth-child(6)').text(), 'steve');
});

test('it uses the `value` key if no property name is provided', function(assert) {
  assert.expect(7);

  this.render(hbs`{{sortable-list content=content}}`);
  assert.equal(this.$('ol li').length, 6);
  assert.equal(this.$('ol li:nth-child(1)').text(), '1');
  assert.equal(this.$('ol li:nth-child(2)').text(), '2');
  assert.equal(this.$('ol li:nth-child(3)').text(), '3');
  assert.equal(this.$('ol li:nth-child(4)').text(), '4');
  assert.equal(this.$('ol li:nth-child(5)').text(), '5');
  assert.equal(this.$('ol li:nth-child(6)').text(), '6');
});

test('it renders an empty list if not provided with any content', function(assert) {
  assert.expect(2);

  this.render(hbs`{{sortable-list property='name'}}`);
  assert.equal(this.$('ol').length, 1);
  assert.equal(this.$('ol li').length, 0);
});

skip('reorders content when items are dragged and dropped');
