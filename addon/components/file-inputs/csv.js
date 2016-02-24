import Ember from 'ember';
import EmberUploader from 'ember-uploader';
/* global Papa */

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(e) {
    const files = e.target.files;

    if (!Ember.isEmpty(files)) {
      Papa.parse(files[0], {
        skipEmptyLines: true,
        complete: results => this.set('file', results)
      });
    }
  }
});
