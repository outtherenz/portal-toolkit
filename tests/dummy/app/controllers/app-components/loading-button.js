import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  isSaving: false,
  buttonCode: "{{loading-button action='save' isLoading=isSaving isDisabled=false}}",
  actions: {
    save(){
      this.set('isSaving', true);
    },
    reset(){
      this.set('isSaving', false);
    }
  }
});
