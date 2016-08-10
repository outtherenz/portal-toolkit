/* eslint-env node */

module.exports = function(/* environment, appConfig */) {
  return {
    EmberENV: {
      EXTEND_PROTOTYPES: {
        String: true,
        Array: true
      }
    }
  };
};
