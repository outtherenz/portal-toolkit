import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  isSaving: false,
  buttonCode1: "{{loading-button action='save' isLoading=isSaving isDisabled=false}}",
  buttonCode2: "{{loading-button action='save' isLoading=isSaving isDisabled=true}}",
  actions: {
    save(){
      this.set('isSaving', true);
    },
    reset(){
      this.set('isSaving', false);
    }
  }
});
