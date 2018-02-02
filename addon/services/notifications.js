import Service from '@ember/service';
import { assert } from '@ember/debug';
import EObject, { set, get } from '@ember/object';
import { later } from '@ember/runloop';
import Ember from '@ember/application';

// TODO figure out a better way to check if we are in test mode
const {
  testing
} = Ember;

export default Service.extend({
  list: [],

  defaultClearDuration: 3500,

  info()    { return this.showProxy('info',    ...arguments); },
  warning() { return this.showProxy('warning', ...arguments); },
  success() { return this.showProxy('success', ...arguments); },
  error()   { return this.showProxy('error',   ...arguments); },

  showProxy(type, options, duration) {
    options = options || {};

    if (typeof options === 'string') {
      options = {
        message: options
      };
    }

    options.type = type;

    return this.show(options, duration);
  },

  show(options, duration = get(this, 'defaultClearDuration')) {
    options = options || {};

    // Support show('Message')
    if (typeof options === 'string') {
      options = { message: options };
    }

    const {
      message,
      type = 'info',
      autoClear = arguments.length > 1 || options.type === 'success',
      clearDuration = duration
    } = options;

    // Check that a message has been set
    assert('A notification message must be set.', message);

    const notification = EObject.create({
      message,
      type,
      autoClear,
      clearDuration
    });

    get(this, 'list').pushObject(notification);

    if (get(notification, 'autoClear')) {
      this.setupAutoClear(notification);
    }

    return notification;
  },

  setupAutoClear(notification) {
    if (testing) return;

    later(() => {
      // Hasn't been closed manually
      if (get(this, 'list').indexOf(notification) !== -1 && !get(notification, 'dismiss')) {
        this.clear(notification);
      }
    }, get(notification, 'clearDuration'));
  },

  clear(notification) {
    assert('The notification to clear must be provided.', notification);

    set(notification, 'dismiss', true);

    // Delay removal from DOM for dismissal animation
    later(() => get(this, 'list').removeObject(notification), 500);
  },

  clearAll() {
    get(this, 'list').forEach(notification => this.clear(notification));
  }
});
