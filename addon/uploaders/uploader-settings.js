import Ember from 'ember';
import EmberUploader from 'ember-uploader';

const { get, set } = Ember;

export default EmberUploader.Uploader.extend({
  ajaxSettings(url, params, method) {
    const settings = this._super(...arguments);
    set(settings, 'headers', get(this, 'headers'));
    return settings;
  }
});
