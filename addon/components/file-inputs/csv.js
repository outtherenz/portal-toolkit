import Ember from 'ember';
import EmberUploader from 'ember-uploader';
/* global Papa */

const {
  isEmpty,
  get,
  set
} = Ember;

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    const files = event.target.files;

    if (isEmpty(files) || files[0] == null) {
      set(this, 'file', null);
      return;
    }

    Papa.parse(files[0], {
      skipEmptyLines: true,
      complete: results => {
        // This is a very strange case that arose in production.
        // Somehow a new line char was being missed at the end of the file,
        // causing it to be in a line by itself and breaking the format.
        // This may get fixed in subsequent versions of papaparse but for
        // now they are not accepting issues.
        const lastLine = get(results, 'data.lastObject');
        if (get(lastLine, 'length') === 1 && lastLine[0] === '\n') {
          get(results, 'data').removeObject(lastLine);
        }

        set(this, 'file', results);
      }
    });
  }
});
