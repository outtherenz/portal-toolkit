// import { expect } from 'chai';
import { describeComponent } from 'ember-mocha';
// import hbs from 'htmlbars-inline-precompile';

describeComponent('untethered-modal-dialog', 'Integration: UntetheredModalDialogComponent', { integration: true }, function() {
  // phantomjs doesnt beleive in wormholes
  // it('renders', function() {
  //   this.render(hbs`
  //     {{#untethered-modal-dialog translucentOverlay=true close='toggleIsConfirmingDelete'}}
  //     <br>
  //       <p>Are you sure you want to test untethered-modal-dialog? This action cannot be undone.</p>
  //       <button class="pull-right delete" {{action 'test'}}>Test</button>
  //       <button class="pull-right plain" {{action 'toggleIsConfirmingTest'}}>Cancel</button>
  //     {{/untethered-modal-dialog}}
  //     `);
  //   expect(this.$('.ember-modal-dialog')).to.have.lengthOf(1);
  // });
});
