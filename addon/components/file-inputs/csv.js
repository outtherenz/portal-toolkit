import Ember from 'ember';
import EmberUploader from 'ember-uploader';
/* global Papa */

const {
  isEmpty,
  get,
  set,
  run
} = Ember;

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    const files = event.target.files;

    if (isEmpty(files) || files[0] == null) {
      set(this, 'file', null);
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      const sanitizedText = reader.result.replace(/[\r\n]+/g, '\n');

      Papa.parse(sanitizedText, {
        skipEmptyLines: true,
        newline: '\n',
        complete: results => run(() => set(this, 'file', results))
      });
    });

    reader.readAsText(files[0]);
  }
});
