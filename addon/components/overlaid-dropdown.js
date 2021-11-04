import Component from '@ember/component';
import { set } from '@ember/object';
import { or } from '@ember/object/computed';
import { next } from '@ember/runloop';
import layout from '../templates/components/overlaid-dropdown';

export default Component.extend({
  layout,
  classNames: [ 'overlaid-dropdown' ],

  showDropdown: or('holdFocus', 'focused'),

  actions: {
    onButtonClick() {
      this.toggleProperty('focused');
      this.$('.overlaid-dropdown__button').focus();
    },

    /*
     * Makes sure that the dropdown doesn't disappear if user clicks inside the dropdown.
     * Holds the dropdown, waits for the blur event on the button, then focuses the button
     * again and releases the hold so that the blur event can happen again.
     */
    holdFocus(e) {
      // Keep dropdown visible
      set(this, 'holdFocus', true);
      // Wait for blur event to occur
      next(() => {
        // Refocus the button (should be found inside this component)
        // The blur event can now be triggered again
        const buttonElem = this.$('.overlaid-dropdown__button');
        if (this.isDestroyed || !buttonElem) return;
        if (e.target.tagName === 'BUTTON') buttonElem.focus();
        // Set focused back to true
        set(this, 'focused', true);
        // Release the hold on the dropdown being open
        set(this, 'holdFocus', false);
      });
    }
  }
});
