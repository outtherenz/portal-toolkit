import Ember from 'ember';
import qs from 'npm:qs';

const { $, run } = Ember;

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
