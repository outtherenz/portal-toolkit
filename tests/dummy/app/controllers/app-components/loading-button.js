import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  isSaving: false,
  buttonCode1: "{{loading-button action='save' isLoading=isSaving isDisabled=false}}",
  buttonCode2: "{{loading-button action='save' isLoading=isSaving isDisabled=true}}",
  buttonCode3: "{{#loading-button action='save' isLoading=isSaving isDisabled=false}} test {{/loading-button}}",
  example: '{{#loading-button}} test {{/loading-button}}',

  actions: {
    save() {
      this.set('isSaving', true);
    },
    reset() {
      this.set('isSaving', false);
    }
  }
});
