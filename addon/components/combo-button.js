import Component from '@ember/component';
import layout from '../templates/components/combo-button';
import { or } from '@ember/object/computed';
import { set } from '@ember/object';
import { next } from '@ember/runloop';

export default Component.extend({
  layout,
  classNames: ['combo-button__outside-container'],
  showDropdown: or('holdFocus', 'focused'),

  focusOut() {
    set(this, 'focused', false);
  },

  actions: {
    onButtonClick() {
      set(this, 'focused', false);
      this.sendAction('action');
    },
    /*
     * Makes sure that the dropdown doesn't disappear if user clicks inside the dropdown.
     * Holds the dropdown, waits for the blur event on the button, then focuses the button
     * again and releases the hold so that the blur event can happen again.
     */
    holdFocus() {
      // Keep dropdown visible
      set(this, 'holdFocus', true);
      // Wait for blur event to occur
      next(() => {
        // Set focused back to true
        set(this, 'focused', true);
        // Release the hold on the dropdown being open
        set(this, 'holdFocus', false);
      });
    }
  }
});
