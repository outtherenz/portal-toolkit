import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('date-picker-day', 'Unit | Component | date picker day', {
  unit: true
});

test('correctly calculates isSelected', function(assert) {
  assert.expect(5);

  const component = this.subject();

  component.set('date', {
    day: 1,
    month: 1,
    year: 2017
  });

  component.set('selection', {
    day: 1,
    month: 1,
    year: 2017
  });

  assert.ok(component.get('isSelected'));

  component.set('selection.day', 2);

  assert.ok(!component.get('isSelected'));

  component.set('selection.day', 1);
  component.set('selection.month', 2);

  assert.ok(!component.get('isSelected'));

  component.set('selection.month', 1);
  component.set('selection.year', 2016);

  assert.ok(!component.get('isSelected'));

  component.set('selection.year', 2017);

  assert.ok(component.get('isSelected'));
});

test('correctly calculates isActiveMonth', function(assert) {
  assert.expect(4);

  const component = this.subject();

  component.set('date', {
    month: 1,
    year: 2017
  });

  component.set('calendarState', {
    month: 1,
    year: 2017
  });

  assert.ok(component.get('isActiveMonth'));

  component.set('calendarState.month', 2);

  assert.ok(!component.get('isActiveMonth'));

  component.set('calendarState.month', 1);
  component.set('calendarState.year', 2016);

  assert.ok(!component.get('isActiveMonth'));

  component.set('calendarState.year', 2017);

  assert.ok(component.get('isActiveMonth'));
});
