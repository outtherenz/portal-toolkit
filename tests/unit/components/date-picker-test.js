import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | date picker', function(hooks) {
  setupTest(hooks);

  test('calendar is correctly calculated when the 1st is a Sunday', function(assert) {
    assert.expect(8);

    const component = this.owner.factoryFor('component:date-picker').create();

    component.set('date', new Date('2017-01-24'));

    const calendar = component.get('calendar');

    assert.equal(calendar.length, 6);
    calendar.forEach(week => assert.equal(week.length, 7));

    assert.deepEqual(calendar[0], [
      { day: 1, month: 0, year: 2017 },
      { day: 2, month: 0, year: 2017 },
      { day: 3, month: 0, year: 2017 },
      { day: 4, month: 0, year: 2017 },
      { day: 5, month: 0, year: 2017 },
      { day: 6, month: 0, year: 2017 },
      { day: 7, month: 0, year: 2017 }
    ]);
  });

  test('calendar is correctly calculated when the 1st is a Wednesday', function(assert) {
    assert.expect(8);

    const component = this.owner.factoryFor('component:date-picker').create();

    component.set('date', new Date('2017-02-24'));

    const calendar = component.get('calendar');

    assert.equal(calendar.length, 6);
    calendar.forEach(week => assert.equal(week.length, 7));

    assert.deepEqual(calendar[0], [
      { day: 29, month: 0, year: 2017 },
      { day: 30, month: 0, year: 2017 },
      { day: 31, month: 0, year: 2017 },
      { day: 1, month: 1, year: 2017 },
      { day: 2, month: 1, year: 2017 },
      { day: 3, month: 1, year: 2017 },
      { day: 4, month: 1, year: 2017 }
    ]);
  });

  test('full calendar is provided', function(assert) {
    assert.expect(7 * 6);

    const component = this.owner.factoryFor('component:date-picker').create();

    component.set('date', new Date('2017-01-01'));

    let nextDate = 1;
    const calendar = component.get('calendar');

    calendar.forEach(week => {
      week.forEach(day => {
        assert.equal(day.day, nextDate);
        nextDate = nextDate % 31 + 1;
      });
    });
  });

  test('number of days in February is correct', function(assert) {
    assert.expect(5);

    const component = this.owner.factoryFor('component:date-picker').create();

    component.set('date', new Date('2016-02-01'));

    const leapYear = component.get('calendar');

    assert.equal(leapYear[4][0].day, 28);
    assert.equal(leapYear[4][1].day, 29);
    assert.equal(leapYear[4][2].day, 1);

    component.set('date', new Date('2017-02-01'));

    const nonLeapYear = component.get('calendar');

    assert.equal(nonLeapYear[4][2].day, 28);
    assert.equal(nonLeapYear[4][3].day, 1);
  });
});
