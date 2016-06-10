import { expect } from 'chai';
import { describe, it } from 'mocha';
import sortAccounts from 'portal-toolkit/utils/sort-accounts';

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

describe('sortAccounts', function() {
  it('groups and sorts by category, then sort index', function() {
    const sortedNames = sortAccounts(accounts).map(account => account.name);

    expect(sortedNames).to.deep.equal([
      'Income',
      'Expenses',
      'Assets',
      'Liabilities',
      'Number of Employees'
    ]);
  });

  it('uses custom sort keys', function() {
    accounts.forEach(account => {
      delete account.sortIndex;
    });

    const sortedNames = sortAccounts(accounts, 'custom.sort').map(account => account.name);

    expect(sortedNames).to.deep.equal([
      'Income',
      'Expenses',
      'Assets',
      'Liabilities',
      'Number of Employees'
    ]);
  });

  it('uses custom sort and category keys', function() {
    accounts.forEach(account => {
      delete account.category;
    });

    const sortedNames = sortAccounts(accounts, 'custom.sort', 'custom.category')
      .map(account => account.name);

    expect(sortedNames).to.deep.equal([
      'Income',
      'Expenses',
      'Assets',
      'Liabilities',
      'Number of Employees'
    ]);
  });
});
