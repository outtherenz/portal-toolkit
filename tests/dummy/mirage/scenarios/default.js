/* global _ */

/* eslint-disable no-unused-vars */

export default function(server) {
  server.logging = false;

  const organisations = server.createList('organisation', 2);
  const branches = server.createList('branch', 10, { organisation: organisations[0] });

  const groupDefault = {
    organisation: organisations[0],
    members: branches,
    canBeAccessedBy: branches
  };

  const groups = [
    server.create('group', _.merge(groupDefault, { members: branches.slice(0, 2) })),
    server.create('group', _.merge(groupDefault, { members: branches.slice(2, 2) })),
    server.create('group', _.merge(groupDefault, { members: branches.slice(3, 4) })),
    server.create('group', _.merge(groupDefault, { canBeAccessedBy: branches.slice(0, 2) }))
  ];

  const user = server.create('user');

  const sales = server.create('account', { organisation: organisations[0], name: 'Sales', isHeading: true });
  const salesBreakdown = [
    server.create('account', { organisation: organisations[0], name: 'Timber', parent: sales }),
    server.create('account', { organisation: organisations[0], name: 'Hardware', parent: sales }),
    server.create('account', { organisation: organisations[0], name: 'Manufacturing', parent: sales })
  ];
  const expenses = server.create('account', { organisation: organisations[0], name: 'Expenses', debitCredit: 'DEBIT' });
  const balanceSheet = [
    server.create('account', { organisation: organisations[0], category: 'balance-sheet', name: 'Assets', debitCredit: 'DEBIT' }),
    server.create('account', { organisation: organisations[0], category: 'balance-sheet', name: 'Liabilites' })
  ];

  const kpis = [
    server.create('kpi', { organisation: organisations[0], name: 'Gross Margin Percentage', calculation: 'gross-margin-percentage' }),
    server.create('kpi', { organisation: organisations[0], name: 'Net Profit Percentage', calculation: 'net-profit-percentage' })
  ];

  const dashboardModuleDefault = {
    user,
    organisation: organisations[0],
    periodType: 'month',
    includeCurrentBranch: true
  };

  const dashboardModules = [
    // server.create('dashboard-module', {
    //   user,
    //   organisation: organisations[0],
    //   periodType: 'month',
    //   includeCurrentBranch: true,
    //   positionX: 0,
    //   positionY: 0,
    //   visualiser: 'line-chart',
    //   kpis: kpis.slice(0, 1),
    //   accounts: [],
    //   branches: [],
    //   groups: groups.slice(0, 3),
    // }),
    server.create('dashboard-module', {
      user,
      organisation: organisations[0],
      periodType: 'month',
      includeCurrentBranch: true,
      positionX: 1,
      positionY: 0,
      visualiser: 'pie-chart',
      kpis: [],
      accountIds: salesBreakdown.map(m => m.id),
      branches: [],
      groups: []
    }),
    server.create('dashboard-module', {
      user,
      organisation: organisations[0],
      periodType: 'month',
      includeCurrentBranch: true,
      positionX: 0,
      positionY: 1,
      visualiser: 'data-table',
      kpis: [],
      accountIds: salesBreakdown.map(m => m.id),
      branches: [],
      groups: []
    })
  ];

  // console.log(dashboardModules[1])
}
