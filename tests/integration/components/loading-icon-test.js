import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loading-icon', 'Integration | Component | loading icon', {
  integration: true
});

test('it renders a ripple', function(assert) {
  assert.expect(3);

  this.render(hbs`{{loading-icon 'ripple'}}`);

  const icon = this.$().children('.loading-icon.loading-icon--ripple');
  assert.equal(icon.length, 1);

  const svg = icon.children('svg');
  assert.equal(svg.length, 1);

  const circles = svg.children('circle');
  assert.equal(circles.length, 4);
});

test('it renders a spinner', function(assert) {
  assert.expect(3);

  this.render(hbs`{{loading-icon 'spinner'}}`);

  const icon = this.$().children('.loading-icon.loading-icon--spinner');
  assert.equal(icon.length, 1);

  const svg = icon.children('svg');
  assert.equal(svg.length, 1);

  const circles = svg.children('circle');
  assert.equal(circles.length, 1);
});
