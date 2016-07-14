import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  dataOptions: ['data1', 'data2'],
  metrics1: [{
    metric: '5760a0026a2fdd76101ea43c',
    series: [{
      branch: '576090256a2fdd76101ea427',
      periods: [{
        date: '2015-04-30T11:59:59.999Z',
        import: '5767787fbd59bec40b67f0a5',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 141256954.56076062,
            mapsUsed: []
          },
          ytd: {
            value: 141256954.56076062,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-05-31T11:59:59.999Z',
        import: '576778bdbd59bec40b68223b',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 217427526.74234638,
            mapsUsed: []
          },
          ytd: {
            value: 358684481.303107,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-06-30T11:59:59.999Z',
        import: '576778d9bd59bec40b685767',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 170602327.3510338,
            mapsUsed: []
          },
          ytd: {
            value: 529286808.65414083,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-07-31T11:59:59.999Z',
        import: '576778f2bd59bec40b689029',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 190836427.96859878,
            mapsUsed: []
          },
          ytd: {
            value: 720123236.6227396,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-08-31T11:59:59.999Z',
        import: '5767797abd59bec40b68cc81',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 203629715.9220456,
            mapsUsed: []
          },
          ytd: {
            value: 923752952.5447853,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-09-30T10:59:59.999Z',
        import: '576779a8bd59bec40b690c6f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 136587361.72003952,
            mapsUsed: []
          },
          ytd: {
            value: 1060340314.2648247,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-10-31T10:59:59.999Z',
        import: '576779c4bd59bec40b694ff3',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 133062830.2337743,
            mapsUsed: []
          },
          ytd: {
            value: 1193403144.498599,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-11-30T10:59:59.999Z',
        import: '576779e7bd59bec40b69970d',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 170197996.44031328,
            mapsUsed: []
          },
          ytd: {
            value: 1363601140.9389122,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-12-31T10:59:59.999Z',
        import: '57677ad8bd59bec40b69e1bd',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 147411746.0474853,
            mapsUsed: []
          },
          ytd: {
            value: 1511012886.9863977,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-01-31T10:59:59.999Z',
        import: '57677b07bd59bec40b6a3003',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 177732808.8907987,
            mapsUsed: []
          },
          ytd: {
            value: 1688745695.8771963,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-02-29T10:59:59.999Z',
        import: '57677b23bd59bec40b6a81df',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 191993814.5862885,
            mapsUsed: []
          },
          ytd: {
            value: 1880739510.4634848,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-03-31T10:59:59.999Z',
        import: '57677b3fbd59bec40b6ad751',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090256a2fdd76101ea427',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 91262043.8228327,
            mapsUsed: []
          },
          ytd: {
            value: 1972001554.2863173,
            mapsUsed: []
          }
        }
      }]
    }, {
      branch: '576090286a2fdd76101ea428',
      periods: [{
        date: '2015-04-30T11:59:59.999Z',
        import: '57687d77bd59bec40b6d255f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 194035867.8138619,
            mapsUsed: []
          },
          ytd: {
            value: 194035867.8138619,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-05-31T11:59:59.999Z',
        import: '57687dabbd59bec40b6d56f5',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 134120740.39241433,
            mapsUsed: []
          },
          ytd: {
            value: 328156608.20627624,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-06-30T11:59:59.999Z',
        import: '57687dc2bd59bec40b6d8c21',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 149284812.87529847,
            mapsUsed: []
          },
          ytd: {
            value: 477441421.0815747,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-07-31T11:59:59.999Z',
        import: '57687ddabd59bec40b6dc4e3',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 167245668.05340862,
            mapsUsed: []
          },
          ytd: {
            value: 644687089.1349834,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-08-31T11:59:59.999Z',
        import: '57687df2bd59bec40b6e013b',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 126823766.12208506,
            mapsUsed: []
          },
          ytd: {
            value: 771510855.2570685,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-09-30T10:59:59.999Z',
        import: '57687e0cbd59bec40b6e4129',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 135380413.88164142,
            mapsUsed: []
          },
          ytd: {
            value: 906891269.1387098,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-10-31T10:59:59.999Z',
        import: '57687e27bd59bec40b6e84ad',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 179103321.78500155,
            mapsUsed: []
          },
          ytd: {
            value: 1085994590.9237113,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-11-30T10:59:59.999Z',
        import: '57687e5fbd59bec40b6ecbc7',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 204260327.53057036,
            mapsUsed: []
          },
          ytd: {
            value: 1290254918.4542818,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-12-31T10:59:59.999Z',
        import: '57687e7cbd59bec40b6f1677',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 89427226.21655732,
            mapsUsed: []
          },
          ytd: {
            value: 1379682144.6708388,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-01-31T10:59:59.999Z',
        import: '57687e9bbd59bec40b6f64bd',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 139543938.23441625,
            mapsUsed: []
          },
          ytd: {
            value: 1519226082.9052553,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-02-29T10:59:59.999Z',
        import: '57687ebbbd59bec40b6fb699',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 157692592.2322001,
            mapsUsed: []
          },
          ytd: {
            value: 1676918675.1374555,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-03-31T10:59:59.999Z',
        import: '57687edabd59bec40b700c0b',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090286a2fdd76101ea428',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 197656403.93702123,
            mapsUsed: []
          },
          ytd: {
            value: 1874575079.0744767,
            mapsUsed: []
          }
        }
      }]
    }, {
      branch: '5760902c6a2fdd76101ea429',
      periods: [{
        date: '2015-04-30T11:59:59.999Z',
        import: '57688709bd59bec40b72034e',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 104643152.2629373,
            mapsUsed: []
          },
          ytd: {
            value: 104643152.2629373,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-05-31T11:59:59.999Z',
        import: '57688720bd59bec40b72355f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 114349160.21961968,
            mapsUsed: []
          },
          ytd: {
            value: 218992312.482557,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-06-30T11:59:59.999Z',
        import: '57688753bd59bec40b726b0f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 91602324.3152552,
            mapsUsed: []
          },
          ytd: {
            value: 310594636.7978122,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-07-31T11:59:59.999Z',
        import: '57688779bd59bec40b72a45e',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 120097386.83114868,
            mapsUsed: []
          },
          ytd: {
            value: 430692023.62896097,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-08-31T11:59:59.999Z',
        import: '57688900bd59bec40b72e14c',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 120097386.83114868,
            mapsUsed: []
          },
          ytd: {
            value: 550789410.4601096,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-09-30T10:59:59.999Z',
        import: '5768891fbd59bec40b7321d9',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 153280604.80402425,
            mapsUsed: []
          },
          ytd: {
            value: 704070015.2641338,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-10-31T10:59:59.999Z',
        import: '576889d2bd59bec40b736605',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 175593809.64959908,
            mapsUsed: []
          },
          ytd: {
            value: 879663824.913733,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-11-30T10:59:59.999Z',
        import: '57688b13bd59bec40b73add0',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 157267731.68981636,
            mapsUsed: []
          },
          ytd: {
            value: 1036931556.6035492,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-12-31T10:59:59.999Z',
        import: '57688b37bd59bec40b73f93a',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 197455936.91058582,
            mapsUsed: []
          },
          ytd: {
            value: 1234387493.514135,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-01-31T10:59:59.999Z',
        import: '57688b51bd59bec40b744843',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 222612140.07821235,
            mapsUsed: []
          },
          ytd: {
            value: 1456999633.5923474,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-02-29T10:59:59.999Z',
        import: '57688b6fbd59bec40b749aeb',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 192386974.1569087,
            mapsUsed: []
          },
          ytd: {
            value: 1649386607.7492561,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-03-31T10:59:59.999Z',
        import: '57688b8dbd59bec40b74f132',
        account: '5760a0026a2fdd76101ea43c',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 75879069.33031355,
            mapsUsed: []
          },
          ytd: {
            value: 1725265677.0795698,
            mapsUsed: []
          }
        }
      }]
    }, {
      branch: '576090316a2fdd76101ea42a',
      periods: [{
        date: '2015-04-30T11:59:59.999Z',
        import: '57689579bd59bec40b7697a9',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 232257358.61476168,
            mapsUsed: []
          },
          ytd: {
            value: 232257358.61476168,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-05-31T11:59:59.999Z',
        import: '57689606bd59bec40b76c93f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 170582961.37692678,
            mapsUsed: []
          },
          ytd: {
            value: 402840319.9916885,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-06-30T11:59:59.999Z',
        import: '5768965ebd59bec40b76fe6b',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 164946706.96000445,
            mapsUsed: []
          },
          ytd: {
            value: 567787026.951693,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-07-31T11:59:59.999Z',
        import: '57689677bd59bec40b77372d',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 115325806.80338904,
            mapsUsed: []
          },
          ytd: {
            value: 683112833.755082,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-08-31T11:59:59.999Z',
        import: '5768968cbd59bec40b777385',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 257261482.52080935,
            mapsUsed: []
          },
          ytd: {
            value: 940374316.2758912,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-09-30T10:59:59.999Z',
        import: '576896a6bd59bec40b77b373',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 306755994.9093857,
            mapsUsed: []
          },
          ytd: {
            value: 1247130311.1852772,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-10-31T10:59:59.999Z',
        import: '5768987cbd59bec40b77f6f7',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 292928342.0824058,
            mapsUsed: []
          },
          ytd: {
            value: 1540058653.2676828,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-11-30T10:59:59.999Z',
        import: '57689928bd59bec40b783e11',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 281638311.6948235,
            mapsUsed: []
          },
          ytd: {
            value: 1821696964.9625063,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-12-31T10:59:59.999Z',
        import: '5768994cbd59bec40b7888c1',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 345001905.16089183,
            mapsUsed: []
          },
          ytd: {
            value: 2166698870.123398,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-01-31T10:59:59.999Z',
        import: '57689981bd59bec40b78d707',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 263533095.86386585,
            mapsUsed: []
          },
          ytd: {
            value: 2430231965.9872637,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-02-29T10:59:59.999Z',
        import: '576899a0bd59bec40b7928e3',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 262056966.94927457,
            mapsUsed: []
          },
          ytd: {
            value: 2692288932.9365387,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-03-31T10:59:59.999Z',
        import: '576899b9bd59bec40b797e55',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090316a2fdd76101ea42a',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 215082525.27850258,
            mapsUsed: []
          },
          ytd: {
            value: 2907371458.2150407,
            mapsUsed: []
          }
        }
      }]
    }, {
      branch: '576090366a2fdd76101ea42b',
      periods: [{
        date: '2015-04-30T11:59:59.999Z',
        import: '5768aa9696ae86ff09b23d07',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 101910611.38886636,
            mapsUsed: []
          },
          ytd: {
            value: 101910611.38886636,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-05-31T11:59:59.999Z',
        import: '5768aaab96ae86ff09b26e9d',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 84520930.48158441,
            mapsUsed: []
          },
          ytd: {
            value: 186431541.8704508,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-06-30T11:59:59.999Z',
        import: '5768aace96ae86ff09b2a3c9',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 75206230.52292992,
            mapsUsed: []
          },
          ytd: {
            value: 261637772.3933807,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-07-31T11:59:59.999Z',
        import: '5768aae696ae86ff09b2dc8b',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 97058309.50672919,
            mapsUsed: []
          },
          ytd: {
            value: 358696081.9001099,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-08-31T11:59:59.999Z',
        import: '5768aaff96ae86ff09b318e3',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 92977958.67279613,
            mapsUsed: []
          },
          ytd: {
            value: 451674040.57290596,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-09-30T10:59:59.999Z',
        import: '5768ab1896ae86ff09b358d1',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 74670350.860142,
            mapsUsed: []
          },
          ytd: {
            value: 526344391.433048,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-10-31T10:59:59.999Z',
        import: '5768ab2c96ae86ff09b39c55',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 70118166.5153041,
            mapsUsed: []
          },
          ytd: {
            value: 596462557.9483521,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-11-30T10:59:59.999Z',
        import: '5768ab4696ae86ff09b3e36f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 54670817.6898049,
            mapsUsed: []
          },
          ytd: {
            value: 651133375.638157,
            mapsUsed: []
          }
        }
      }, {
        date: '2015-12-31T10:59:59.999Z',
        import: '5768ab5c96ae86ff09b42e1f',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 35485996.08751718,
            mapsUsed: []
          },
          ytd: {
            value: 686619371.7256742,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-01-31T10:59:59.999Z',
        import: '5768abeb96ae86ff09b52077',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 68981329.70277144,
            mapsUsed: []
          },
          ytd: {
            value: 755600701.4284457,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-02-29T10:59:59.999Z',
        import: '5768abab96ae86ff09b47c65',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 80350965.97813162,
            mapsUsed: []
          },
          ytd: {
            value: 835951667.4065771,
            mapsUsed: []
          }
        }
      }, {
        date: '2016-03-31T10:59:59.999Z',
        import: '5768abc996ae86ff09b4cd2d',
        account: '5760a0026a2fdd76101ea43c',
        branch: '576090366a2fdd76101ea42b',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 53407782.96150786,
            mapsUsed: []
          },
          ytd: {
            value: 889359450.3680851,
            mapsUsed: []
          }
        }
      }]
    }],
    meta: {
      _id: '5760a0026a2fdd76101ea43c',
      name: 'Sales',
      code: null,
      periodic: true,
      debitCredit: 'CREDIT',
      category: 'profit-and-loss',
      label: null,
      sortIndex: 2,
      dateCreated: '2016-06-15T00:23:30.640Z',
      dateModified: '2016-06-15T00:46:59.703Z',
      parent: '57609fb96a2fdd76101ea436',
      organisation: '576090186a2fdd76101ea426',
      isHeading: true,
      status: 'ACTIVE',
      format: 'CURRENCY',
      __V: 0
    }
  }],
  period: {start: '2015-03', end: '2016-03', type: month},
  metrics2: [{
    metric: '5760be476a2fdd76101ea492',
    series: [{
      branch: '5760902c6a2fdd76101ea429',
      periods: [{
        date: '2016-03-31T10:59:59.999Z',
        import: '57688b8dbd59bec40b74f132',
        account: '5760be476a2fdd76101ea492',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 318775.577602233,
            isManual: false,
            mapsUsed: []
          },
          ytd: {
            value: 5250858.144413902,
            mapsUsed: []
          }
        }
      }]
    }],
    meta: {
      _id: '5760be476a2fdd76101ea492',
      name: 'Wages',
      code: null,
      periodic: true,
      debitCredit: 'DEBIT',
      category: 'profit-and-loss',
      label: null,
      sortIndex: 95,
      dateCreated: '2016-06-15T02:32:39.517Z',
      dateModified: '2016-06-19T22:13:14.338Z',
      parent: '5760be476a2fdd76101ea48a',
      organisation: '576090186a2fdd76101ea426',
      isHeading: false,
      status: 'ACTIVE',
      format: 'CURRENCY',
      __V: 0
    }
  }, {
    metric: '5760be9c6a2fdd76101ea494',
    series: [{
      branch: '5760902c6a2fdd76101ea429',
      periods: [{
        date: '2016-03-31T10:59:59.999Z',
        import: '57688b8dbd59bec40b74f132',
        account: '5760be9c6a2fdd76101ea494',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 388355.64077343,
            isManual: false,
            mapsUsed: []
          },
          ytd: {
            value: 5716911.105927095,
            mapsUsed: []
          }
        }
      }]
    }],
    meta: {
      _id: '5760be9c6a2fdd76101ea494',
      name: 'Training',
      code: null,
      periodic: true,
      debitCredit: 'DEBIT',
      category: 'profit-and-loss',
      label: null,
      sortIndex: 101,
      dateCreated: '2016-06-15T02:34:04.351Z',
      dateModified: '2016-06-19T22:13:14.352Z',
      parent: '5760be476a2fdd76101ea48a',
      organisation: '576090186a2fdd76101ea426',
      isHeading: false,
      status: 'ACTIVE',
      format: 'CURRENCY',
      __V: 0
    }
  }, {
    metric: '5760be9c6a2fdd76101ea495',
    series: [{
      branch: '5760902c6a2fdd76101ea429',
      periods: [{
        date: '2016-03-31T10:59:59.999Z',
        import: '57688b8dbd59bec40b74f132',
        account: '5760be9c6a2fdd76101ea495',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 1248393.71537263,
            isManual: false,
            mapsUsed: []
          },
          ytd: {
            value: 8334844.346340096,
            mapsUsed: []
          }
        }
      }]
    }],
    meta: {
      _id: '5760be9c6a2fdd76101ea495',
      name: 'Hiring',
      code: null,
      periodic: true,
      debitCredit: 'DEBIT',
      category: 'profit-and-loss',
      label: null,
      sortIndex: 97,
      dateCreated: '2016-06-15T02:34:04.351Z',
      dateModified: '2016-06-19T22:13:14.364Z',
      parent: '5760be476a2fdd76101ea48a',
      organisation: '576090186a2fdd76101ea426',
      isHeading: false,
      status: 'ACTIVE',
      format: 'CURRENCY',
      __V: 0
    }
  }, {
    metric: '5760be9c6a2fdd76101ea496',
    series: [{
      branch: '5760902c6a2fdd76101ea429',
      periods: [{
        date: '2016-03-31T10:59:59.999Z',
        import: '57688b8dbd59bec40b74f132',
        account: '5760be9c6a2fdd76101ea496',
        branch: '5760902c6a2fdd76101ea429',
        organisation: '576090186a2fdd76101ea426',
        periodTypes: {
          month: {
            value: 256658.733140252,
            isManual: false,
            mapsUsed: []
          },
          ytd: {
            value: 2146032.977590972,
            mapsUsed: []
          }
        }
      }]
    }],
    meta: {
      _id: '5760be9c6a2fdd76101ea496',
      name: "Bonus's",
      code: null,
      periodic: true,
      debitCredit: 'DEBIT',
      category: 'profit-and-loss',
      label: null,
      sortIndex: 99,
      dateCreated: '2016-06-15T02:34:04.356Z',
      dateModified: '2016-06-19T22:13:14.368Z',
      parent: '5760be476a2fdd76101ea48a',
      organisation: '576090186a2fdd76101ea426',
      isHeading: false,
      status: 'ACTIVE',
      format: 'CURRENCY',
      __V: 0
    }
  }],
  series: [
    {
      name: 'Branch 01',
      system: null,
      id: '576090256a2fdd76101ea427',
      balanceMonth: null,
      dateCreated: '2016-06-14T23:15:49.473Z',
      organisation: '576090186a2fdd76101ea426'
    }, {
      name: 'Branch 02',
      system: null,
      id: '576090286a2fdd76101ea428',
      balanceMonth: null,
      dateCreated: '2016-06-14T23:15:52.398Z',
      organisation: '576090186a2fdd76101ea426'
    }, {
      name: 'Branch 10',
      system: null,
      balanceMonth: null,
      dateCreated: '2016-06-14T23:16:28.557Z',
      organisation: '576090186a2fdd76101ea426'
    }, {
      name: 'Branch 03',
      id: '5760902c6a2fdd76101ea429',
      system: null,
      balanceMonth: null,
      dateCreated: '2016-06-14T23:15:56.358Z',
      organisation: '576090186a2fdd76101ea426'
    }, {
      name: 'Branch 04',
      id: '576090316a2fdd76101ea42a',
      system: null,
      balanceMonth: null,
      dateCreated: '2016-06-14T23:16:01.512Z',
      organisation: '576090186a2fdd76101ea426'
    }, {
      name: 'Branch 05',
      system: null,
      id: '5760903a6a2fdd76101ea42c',
      balanceMonth: null,
      dateCreated: '2016-06-14T23:16:06.036Z',
      organisation: '576090186a2fdd76101ea426'
    }
  ],
  hideData: true,

  words: [
    ['charts/data-table', 'Call for the component'],
    ['series=series', 'this sets the series, takes an array of objects eg', "{name: 'Branch 05',system: null,id: '5760903a6a2fdd76101ea42c',balanceMonth: null,dateCreated: '2016-06-14T23:16:06.036Z',organisation: '576090186a2fdd76101ea426'", true],
    ['thisData=data', 'setting the data'],
    ['metrics=metrics', 'setting the metrics, the metrics makes up most of the table', "metric: '5760be476a2fdd76101ea492'", false],
    ['period=period', 'setting the period'],
  ]
});
