module.exports = {
  description: 'Generates a component integration or unit test.',

  availableOptions: [{
    name: 'test-type',
    type: String,
    default: 'integration',
    aliases: [
      { i: 'integration' },
      { u: 'unit' },
      { integration: 'integration' },
      { unit: 'unit' }
    ]
  }],

  locals(options) {
    var testType = options.testType || 'integration';

    return {
      testType: testType
    };
  },

  fileMapTokens() {
    return {
      __testType__(options) {
        return options.locals.testType || 'integration';
      }
    };
  }
};
