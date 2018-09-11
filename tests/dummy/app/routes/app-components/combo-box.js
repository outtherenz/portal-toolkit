import Route from '@ember/routing/route';

export default Route.extend({
  model: () => ({
    options: [{
      id: '0',
      name: 'Example 0',
      code: '000'
    }, {
      id: '1',
      name: 'Example 1',
      code: '001'
    }, {
      id: '2',
      name: 'Example 2',
      code: '002'
    }, {
      id: '3',
      name: 'Example 3',
      code: '003'
    }, {
      id: '4',
      name: 'Example 4',
      code: '004'
    }, {
      id: '5',
      name: 'Example 5',
      code: '005'
    }, {
      id: '6',
      name: 'Example 6',
      code: '006'
    }, {
      id: '8',
      name: 'Example 8',
      code: '008'
    }],
    value: {
      option: ''
    },
    relationship: {
      id: '0',
      name: 'Example'
    }
  })
});
