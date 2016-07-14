import Ember from 'ember';

const { Controller, computed } = Ember;

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
    }];
    return columns;

  }),

  data: [{
    letters: 'a',
    dob: new Date('1984-05-21'),
    numbers: '1'
  }, {
    letters: 'A',
    dob: new Date('1987-02-11'),
    numbers: '2'
  }, {
    letters: 'a',
    dob: new Date('1987-02-12'),
    numbers: '2'
  }, {
    letters: 'b',
    dob: new Date('1986-03-22'),
    numbers: '12'
  }, {
    letters: 'B',
    dob: new Date('1987-02-10'),
    numbers: '01'
  }, {
    letters: 'ab',
    dob: new Date('1983-04-20'),
    numbers: '02'
  }],

  tableContent: Ember.computed.sort('data', 'sort')
});
