import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  metrics: [
      {
        metric: '5760a5836a2fdd76101ea441',
        meta: {
          name: 'egg',
          id: 6,
        },
        series: [
          {
            branch: 'Branch 1',
            periods: [
              {
                account: 'egg-account',
                branch: 'Branch-1',
                date: '2016-03-31T10:59:59.999Z',
                import: 'branch-1-import-1',
                organisation: 'org-1',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 60
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 80
                  }
                }
              }, {
                account: 'egg-account',
                branch: 'Branch-1',
                date: '2016-04-31T10:59:59.999Z',
                import: 'branch-1-import-1',
                organisation: 'org-1',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 123
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 123
                  }
                }
              }
            ]
          }]
      },
      {
        metric: '5760be476a2fdd76101ea48b',
        meta: {
          name: 'bacon'
        },
        series: [
          {
            branch: '5760902c6a2fdd76101ea429',
            periods: [
              {
                account: '5760be476a2fdd76101ea48b',
                branch: '5760902c6a2fdd76101ea429',
                date: '2016-03-31T10:59:59.999Z',
                import: '57688b8dbd59bec40b74f132',
                organisation: 'org-1',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 40
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 20
                  }
                }
              }
            ]
          }
        ]
      },
      {
        metric: '5760be476a2fdd76101ea48a',
        meta: {
          name: 'steak'
        },
        series: [
          {
            branch: '5760902c6a2fdd76101ea429',
            periods: [
              {
                account: '5760be476a2fdd76101ea48b',
                branch: '5760902c6a2fdd76101ea429',
                date: '2016-03-31T10:59:59.999Z',
                import: '57688b8dbd59bec40b74f132',
                organisation: 'org-1',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 5
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 20
                  }
                }
              }
            ]
          }
        ]
      }
    ],
  period: {start: '2016-03', end: '2017-03', type: 'month'},
  series: [{branch:6}],
  hideData: true,
  h1:'this is h1',
  // h2:'this is h2',
  // h3:'this is h3',
  p1:'this isaddddddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddds p1',
  // p2:'this i<br>s p2',
  // p3:'this is p3',
  pre:'this is pre',
  words: [
    ["charts/data-table", "adding the chart in this is all in handlebars ipfdsfiohdsngdfjnfldkj;bnsd;kfjbds;fknjsd"],
    ["series=series", 'setting the series'],
    ["thisData=data", 'setting the data'],
    ["metrics=metrics", 'setting the metrics'],
    ["period=period", 'setting the period'],
  ]
});
