import Ember from 'ember';
import qs from 'npm:qs';

const { $, run } = Ember;

/**
 * This is a wrapper on window.open()
 * Your popup window should eventually run the code:
 * ```
 * window.opener.Ember.$(window.opener).trigger('popup.message', message)
 * ```
 * The message can be an object or an URL Encoded string that will be pased by qs.
 * There is a file that implements this API available at /portal-toolkit/popup-callback.html
 * (file locatied at this-repo/assets/popup-callback.html) and sends back the query or anchor string as the message.
 * @example
 * import popups from 'portal-toolkit/utils/popup';
 * const {
 *   popup,
 *   promise
 * } = popups('', WindowName, Options); // Create popup window
 * popup.location.href = URL; // Use reference to window
 * promise.then(message => use message); // Use message
 * @param {String} URL - URL of the popup window.
 * @returns {Object} - Object contains `promise` which resolves the message from the popup
 * window and `popup` which is a reference to the window created.
 */
export default function createPopup() {
  const popup = window.open(...arguments);

  const promise = new Promise((resolve, reject) => {
    $(window).on('popup.message', (event, data) => resolve(qs.parse(data)));

    pollPopupClosed(popup, reject);
  });

  return {
    popup,
    promise
  };
}

function pollPopupClosed(popup, onCloseCallback, attempts = 0) {
  // After 2 minutes, consider the attempt timed out.
  // Close the popup and call the onCloseCallback.
  if (attempts > 240) {
    popup.close();
    return onCloseCallback();
  }

  // Wrap the whole thing in runLater so that the first one doesn't happen immediately
  run.later(() => {
    if (popup.closed) {
      onCloseCallback();
    } else {
      pollPopupClosed(popup, onCloseCallback, attempts + 1);
    }
  }, 500);
}
