import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sort: [ 'name:asc' ],

  headers: [{
    name: 'Name',
    key: 'name',
    width: 3
  }, {
    name: 'Date of birth',
    key: 'dob',
    width: 2
  }, {
    name: 'Comments',
    key: 'comment',
    width: 5
  }],

  data: [{
    name: 'Joe Bloggs',
    dob: new Date('1984-05-21'),
    comments: 'Lorem ipsum dolor sit amet, veniam quasi enim nostrum, molestiae suscipit blanditiis.'
  }, {
    name: 'Jane Clive',
    dob: new Date('1987-02-11'),
    comments: 'Veniam quasi enim nostrum, lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  }, {
    name: 'Joe Bloggs',
    dob: new Date('1984-05-21'),
    comments: 'Consectetur adipisicing elit. Veniam quasi enim nostrum, molestiae suscipit blanditiis.'
  }],

  tableContent: Ember.computed.sort('data', 'sort')
});
