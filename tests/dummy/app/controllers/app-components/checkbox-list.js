import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sort: [ 'name:asc' ],

  tableColumns: computed(function() {
    const columns = [{
      name: 'letters',
      key: 'letters',
      width: 3
    }, {
      name: 'Dates',
      key: 'dob',
      width: 2
    }, {
      name: 'Numbers',
      key: 'numbers',
      width: 5
    }, {
      name: 'Numbers As Strings',
      key: 'numbersAsStrings',
      width: 5
    }];
    return columns;

  }),

  data: [{
    letters: 'a',
    dates: new Date('1984-05-21'),
    numbers: 1,
    numbersAsStrings: '1'
  }, {
    letters: 'A',
    dates: new Date('1987-02-11'),
    numbers: 2,
    numbersAsStrings: '2'
  }, {
    letters: 'a',
    dates: new Date('1987-02-12'),
    numbers: 2,
    numbersAsStrings: '2'
  }, {
    letters: 'b',
    dates: new Date('1986-03-22'),
    numbers: 12,
    numbersAsStrings: '12'
  }, {
    letters: 'B',
    dates: new Date('1987-02-10'),
    numbers: 1,
    numbersAsStrings: '01'
  }, {
    letters: 'ab',
    dates: new Date('1983-04-20'),
    numbers: 2,
    numbersAsStrings: '02'
  }],

  tableContent: sort('data', 'sort')
});
