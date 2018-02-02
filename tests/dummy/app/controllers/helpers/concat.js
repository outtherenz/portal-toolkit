import Controller from '@ember/controller';

export default Controller.extend({
  word1: 'test word 1',
  word2: 'test word 2',
  word3: 'test word 3',
  word4: 'test word 4',
  word5: 'test word 5',
  word6: 'test word 6',
  method3: '{{input value=word3}}',
  method4: '{{input value=word4}}',
  method5: '{{input value=word5}}',
  method6: '{{concat word3 word4 word5}}'
});
