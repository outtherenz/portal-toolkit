import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import $ from 'jquery';

const fileContent = `Company,ReportTitle,Period,Account,Name,MonthBal,YTDBal
GISB,BALANCE SHEET,201702,TM7701,Manufacturing Stock on Hand,"-4,176.84","17,230.60"
\r`;

moduleForComponent('file-inputs/csv', 'Unit | Component | file inputs/csv', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it can handle mixed line endings', function(assert) {
  assert.expect(1);

  const component = this.subject();
  const file = new File([ fileContent ], 'file-name.csv');
  const nativeEvent = new Event('change');

  nativeEvent.testFiles = [ file ];

  const event = $.Event(nativeEvent);

  component.change(event);

  return wait().then(() => {
    const result = component.get('file');
    assert.equal(result.data.length, 2);
  });
});
