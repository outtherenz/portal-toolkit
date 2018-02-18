import { isEmpty } from '@ember/utils';
import { set, get } from '@ember/object';
import { run } from '@ember/runloop';
import Ember from 'ember';
import EmberUploader from 'ember-uploader';
/* global Papa */

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    /*
    TODO There is currently no modules friendly approach to this.
    Apparently its being worked on but I can't find where.
    It should be reviseted at a later date.
    */
    const files = get(event, Ember.testing ? 'originalEvent.testFiles' : 'target.files');

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
