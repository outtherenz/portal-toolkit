import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

const fileContent = `Company,ReportTitle,Period,Account,Name,MonthBal,YTDBal
GISB,BALANCE SHEET,201702,TM7701,Manufacturing Stock on Hand,"-4,176.84","17,230.60"
\r`;

module('Unit | Component | file inputs/csv', function(hooks) {
  setupTest(hooks);

  test('it can handle mixed line endings', function(assert) {
    assert.expect(1);

    const component = this.owner.factoryFor('component:file-inputs/csv').create();
    const file = new File([ fileContent ], 'file-name.csv');
    const event = { target: { files: [ file ] } };

    component.change(event);

    return settled().then(() => {
      const result = component.get('file');
      assert.equal(result.data.length, 2);
    });
  });
});
