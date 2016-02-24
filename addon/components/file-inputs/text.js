import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(e) {
    const files = e.target.files;
    const reader = new FileReader();

    reader.onload = err => this.set('file', reader.result);

    if (!Ember.isEmpty(files)) {
      reader.readAsText(files[0]);
    }
  }
});
