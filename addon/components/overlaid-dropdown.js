import Ember from 'ember';
import layout from '../templates/components/overlaid-dropdown';

const {
  Component,
  set,
  computed: { or }
} = Ember;

export default Component.extend({
  layout,
  classNames: [ 'overlaid-dropdown' ],

  showDropdown: or('holdFocus', 'focused'),

  actions: {
    onButtonClick() {
      this.toggleProperty('focused');
      this.$('.overlaid-dropdown__button').focus();
    },

    /**
     * Makes sure that the dropdown doesn't disappear if user clicks inside the dropdown.
     * Holds the dropdown, waits for the blur event on the button, then focuses the button
     * again and releases the hold so that the blur event can happen again.
     */
    holdFocus() {
      // Keep dropdown visible
      set(this, 'holdFocus', true);
      // Wait for blur event to occur
      Ember.run.next(() => {
        // Refocus the button (should be found inside this component)
        // The blur event can now be triggered again
        this.$('.overlaid-dropdown__button').focus();
        // Set focused back to true
        set(this, 'focused', true);
        // Release the hold on the dropdown being open
        set(this, 'holdFocus', false);
      });
    }
  }
});
