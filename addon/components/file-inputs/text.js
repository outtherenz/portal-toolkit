import Ember from 'ember';
import EmberUploader from 'ember-uploader';

const { isEmpty, set } = Ember;

export default EmberUploader.FileField.extend({
  attributeBindings: [ 'accept' ],

  change(event) {
    const files = event.target.files;
    const reader = new FileReader();

    reader.onload = () => set(this, 'file', reader.result);

    if (!isEmpty(files)) {
      reader.readAsText(files[0]);
    }
  }
});
