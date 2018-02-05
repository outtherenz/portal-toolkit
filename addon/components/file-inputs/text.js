import { isEmpty } from '@ember/utils';
import { set, get } from '@ember/object';
import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    /*
    TODO There is currently no modules friendly approach to this.
    Apparently its being worked on but I can't find where.
    It should be reviseted at a later date.
    */
    const files = get(event, Ember.testing ? 'testFiles' : 'target.files');
    const reader = new FileReader();

    reader.onload = () => set(this, 'file', reader.result);

    if (!isEmpty(files)) {
      reader.readAsText(files[0]);
    }
  }
});
