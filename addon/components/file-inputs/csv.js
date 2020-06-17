import { isEmpty } from '@ember/utils';
import { set, get } from '@ember/object';
import { run } from '@ember/runloop';
import Ember from 'ember';
import FileField from 'ember-uploader/components/file-field';
/* global Papa */

export default FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    /*
    TODO There is currently no modules friendly approach to this.
    Apparently its being worked on but I can't find where.
    It should be revisited at a later date.
    */
    const files = get(event, Ember.testing ? 'originalEvent.testFiles' : 'target.files');

    if (isEmpty(files) || files[0] == null) {
      set(this, 'file', null);
      event.target.value = '';
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
    if (!Ember.testing) {
      event.target.value = '';
    }
  }
});
