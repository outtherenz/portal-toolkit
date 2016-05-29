import Ember from 'ember';
import EmberUploader from 'ember-uploader';
/* global Papa */

const { isEmpty, set } = Ember;

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
      complete: results => set(this, 'file', results)
    });
  }
});
