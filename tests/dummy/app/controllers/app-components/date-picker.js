import Ember from 'ember';

const {
  Controller,
  set
} = Ember;

export default Controller.extend({
  selection: {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  },

  actions: {
    changeDate(newDate) {
      set(this, 'selection', newDate);
    }
  }
});
