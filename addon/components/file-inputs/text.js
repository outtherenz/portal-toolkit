import { isEmpty } from '@ember/utils';
import { set, get } from '@ember/object';
import Ember from 'ember';
import EmberUploader from 'ember-uploader';

// TODO figure out a better way to check if we are in test mode
const {
  testing
} = Ember;

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    const files = get(event, testing ? 'testFiles' : 'target.files');
    const reader = new FileReader();

    reader.onload = () => set(this, 'file', reader.result);

    if (!isEmpty(files)) {
      reader.readAsText(files[0]);
    }
  }
});
