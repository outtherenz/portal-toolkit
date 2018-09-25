import Route from '@ember/routing/route';

export default Route.extend({
  model: () => ({
    options: [{
      id: '1',
      date: '01/09/2018',
      name: 'Example 1',
      code: '001'
    }, {
      id: '2',
      date: '02/09/2018',
      name: 'Example 2',
      code: '002'
    }, {
      id: '3',
      date: '03/09/2018',
      name: 'Example 3',
      code: '003'
    }, {
      id: '4',
      date: '04/09/2018',
      name: 'Example 4',
      code: '004'
    }, {
      id: '5',
      date: '05/09/2018',
      name: 'Example 5',
      code: '005'
    }, {
      id: '6',
      date: '06/09/2018',
      name: 'Example 6',
      code: '006'
    }, {
      id: '8',
      date: '08/09/2018',
      name: 'Example 8',
      code: '008'
    }],
    dates: [
      '01/09/2018',
      '02/09/2018',
      '03/09/2018',
      '04/09/2018',
      '05/09/2018',
      '06/09/2018',
      '08/09/2018'
    ],
    code: '',
    name: ''
  })
});
