import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    const files = event.target.files;
    const reader = new FileReader();

    reader.onload = () => this.set('file', reader.result);

    if (!Ember.isEmpty(files)) {
      reader.readAsText(files[0]);
    }
  }
});
