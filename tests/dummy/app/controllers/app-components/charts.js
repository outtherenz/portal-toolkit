import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  metrics: [
    {
      metric: '5760a5836a2fdd76101ea441',
      meta: {
        name: 'egg'
      },
      series: [
        {
          branch: '576090256a2fdd76101ea427',
          periods: [
            {
              account: '57609fb96a2fdd76101ea436',
              branch: '576090256a2fdd76101ea427',
              date: '2016-03-31T10:59:59.999Z',
              import: '57677b3fbd59bec40b6ad751',
              organisation: '576090186a2fdd76101ea426',
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
              organisation: '576090186a2fdd76101ea426',
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
              organisation: '576090186a2fdd76101ea426',
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
  period: {start: '2016-03', end: '2016-03', type: 'month'},
  series: [],
  hideData: true,
  words: [
    ["charts/data-table", "adding the chart in this is all in handlebars ipfdsfiohdsngdfjnfldkj;bnsd;kfjbds;fknjsd"],
    ["series=series", 'setting the series'],
    ["thisData=data", 'setting the data'],
    ["metrics=metrics", 'setting the metrics'],
    ["period=period", 'setting the period'],
  ]
});
