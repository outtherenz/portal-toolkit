import sortAccounts from 'dummy/utils/sort-accounts';
import { module, test } from 'qunit';

const accounts = [{
  name: 'Expenses',
  sortIndex: 2,
  category: 'profit-and-loss'
}, {
  name: 'Assets',
  sortIndex: 1,
  category: 'balance-sheet'
}, {
  name: 'Number of Employees',
  sortIndex: 1,
  category: 'other-data'
}, {
  name: 'Liabilities',
  sortIndex: 2,
  category: 'balance-sheet'
}, {
  name: 'Income',
  sortIndex: 1,
  category: 'profit-and-loss'
}];

accounts.forEach(account => {
  account.custom = {
    sort: account.sortIndex,
    category: account.category
  };
});

module('Unit | Utility | sort accounts');

test('groups and sorts by category, then sort index', function(assert) {
  const sortedNames = sortAccounts(accounts).map(account => account.name);

  assert.deepEqual(sortedNames, [
    'Income',
    'Expenses',
    'Assets',
    'Liabilities',
    'Number of Employees'
  ]);
});

test('uses custom sort keys', function(assert) {
  accounts.forEach(account => {
    delete account.sortIndex;
  });

  const sortedNames = sortAccounts(accounts, 'custom.sort').map(account => account.name);

  assert.deepEqual(sortedNames, [
    'Income',
    'Expenses',
    'Assets',
    'Liabilities',
    'Number of Employees'
  ]);
});

test('uses custom sort and category keys', function(assert) {
  accounts.forEach(account => {
    delete account.category;
  });

  const sortedNames = sortAccounts(accounts, 'custom.sort', 'custom.category')
    .map(account => account.name);

  assert.deepEqual(sortedNames, [
    'Income',
    'Expenses',
    'Assets',
    'Liabilities',
    'Number of Employees'
  ]);
});
