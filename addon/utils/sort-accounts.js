import Ember from 'ember';

const { get } = Ember;

export default function sortAccounts(accounts = [], sortKey = 'sortIndex', categoryKey = 'category') {
  const profitAndLoss = [];
  const balanceSheet = [];
  const other = [];

  accounts.forEach(target => {
    const category = get(target, categoryKey);

    switch (category) {
      case 'profit-and-loss':
        profitAndLoss.push(target);
        break;

      case 'balance-sheet':
        balanceSheet.push(target);
        break;

      default:
        other.push(target);
    }
  });

  return [
    ...profitAndLoss.sortBy(sortKey),
    ...balanceSheet.sortBy(sortKey),
    ...other.sortBy(sortKey)
  ];
}
