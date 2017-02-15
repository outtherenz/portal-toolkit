import Ember from 'ember';
import layout from '../templates/components/date-picker-day';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,

  classNames: [ 'date-picker__day' ],
  classNameBindings: [
    'isSelected:date-picker__day--selected',
    'isActiveMonth::date-picker__day--inactive-month'
  ],

  isSelected: computed('date.{day,month,year}', 'selection.{day,month,year}', function() {
    return get(this, 'date.day') === get(this, 'selection.day') &&
      get(this, 'date.month') === get(this, 'selection.month') &&
      get(this, 'date.year') === get(this, 'selection.year');
  }),

  isActiveMonth: computed('date.{month,year}', 'calendarState.{month,year}', function() {
    return get(this, 'date.month') === get(this, 'calendarState.month') &&
      get(this, 'date.year') === get(this, 'calendarState.year');
  })
});
